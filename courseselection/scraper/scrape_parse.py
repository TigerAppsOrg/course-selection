"""
Scrapes OIT's Web Feeds to add courses and sections to database.
Procedure:
- Get list of departments (3-letter department codes)
- Run this: http://etcweb.princeton.edu/webfeeds/courseofferings/?term=current&subject=COS
- Parse it for courses, sections, and lecture times (as recurring events)
"""

from lxml import etree
from html.parser import HTMLParser
from urllib.request import urlopen
import re
from xml.etree import ElementTree
import requests
import os

# This should technically be imported from
# ../majors_and_certificates/scripts/university_info.py
# but this import currently fails.
# TODO: find out why and merge these lists.
#       Possibly refactor this and move it somewhere else entirely.
DEPTS = {
    "AAS": "African American Studies",
    "AFS": "African Studies",
    "AMS": "American Studies",
    "ANT": "Anthropology",
    "AOS": "Atmospheric & Oceanic Sciences",
    "APC": "Appl and Computational Math",
    "ARA": "Arabic",
    "ARC": "Architecture",
    "ART": "Art and Archaeology",
    "ASA": "Asian American Studies",
    "AST": "Astrophysical Sciences",
    "ATL": "Atelier",
    "BCS": "Bosnian-Croatian-Serbian",
    "CBE": "Chemical and Biological Engr",
    "CEE": "Civil and Environmental Engr",
    "CGS": "Cognitive Science",
    "CHI": "Chinese",
    "CHM": "Chemistry",
    "CHV": "Center for Human Values",
    "CLA": "Classics",
    "CLG": "Classical Greek",
    "COM": "Comparative Literature",
    "COS": "Computer Science",
    "CTL": "Center for Teaching & Learning",
    "CWR": "Creative Writing",
    "CZE": "Czech",
    "DAN": "Dance",
    "EAS": "East Asian Studies",
    "ECO": "Economics",
    "ECS": "European Cultural Studies",
    "EEB": "Ecology and Evol Biology",
    "EGR": "Engineering",
    "ELE": "Electrical Engineering",
    "ENE": "Energy Studies",
    "ENG": "English",
    "ENT": "Entrepreneurship",
    "ENV": "Environmental Studies",
    "EPS": "Contemporary European Politics",
    "FIN": "Finance",
    "FRE": "French",
    "FRS": "Freshman Seminars",
    "GEO": "Geosciences",
    "GER": "German",
    "GHP": "Global Health & Health Policy",
    "GLS": "Global Seminar",
    "GSS": "Gender and Sexuality Studies",
    "HEB": "Hebrew",
    "HIN": "Hindi",
    "HIS": "History",
    "HLS": "Hellenic Studies",
    "HOS": "History of Science",
    "HPD": "History/Practice of Diplomacy",
    "HUM": "Humanistic Studies",
    "ISC": "Integrated Science Curriculum",
    "ITA": "Italian",
    "JDS": "Judaic Studies",
    "JPN": "Japanese",
    "JRN": "Journalism",
    "KOR": "Korean",
    "LAO": "Latino Studies",
    "LAS": "Latin American Studies",
    "LAT": "Latin",
    "LCA": "Lewis Center for the Arts",
    "LIN": "Linguistics",
    "MAE": "Mech and Aerospace Engr",
    "MAT": "Mathematics",
    "MED": "Medieval Studies",
    "MOD": "Media and Modernity",
    "MOG": "Modern Greek",
    "MOL": "Molecular Biology",
    "MPP": "Music Performance",
    "MSE": "Materials Science and Engr",
    "MTD": "Music Theater",
    "MUS": "Music",
    "NES": "Near Eastern Studies",
    "NEU": "Neuroscience",
    "ORF": "Oper Res and Financial Engr",
    "PAW": "Ancient World",
    "PER": "Persian",
    "PHI": "Philosophy",
    "PHY": "Physics",
    "PLS": "Polish",
    "POL": "Politics",
    "POP": "Population Studies",
    "POR": "Portuguese",
    "PSY": "Psychology",
    "QCB": "Quantitative Computational Bio",
    "REL": "Religion",
    "RES": "Russian, East Europ, Eurasian",
    "RUS": "Russian",
    "SAN": "Sanskrit",
    "SAS": "South Asian Studies",
    "SLA": "Slavic Languages and Lit",
    "SML": "Statistics & Machine Learning",
    "SOC": "Sociology",
    "SPA": "Spanish",
    "SPI": "Public and International Affairs",
    "STC": "Science and Technology Council",
    "SWA": "Swahili",
    "THR": "Theater",
    "TPP": "Teacher Preparation",
    "TRA": "Translation, Intercultural Com",
    "TUR": "Turkish",
    "TWI": "Twi",
    "URB": "Urban Studies",
    "URD": "Urdu",
    "VIS": "Visual Arts",
    "WRI": "Princeton Writing Program",
    "WWS": "Public and International Affairs",
}


class ParseError(Exception):

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


def scrape_parse_semester(term_code):
    TERM_CODE = term_code

    headers = {
        "accept": "application/json",
        'Authorization': os.environ.get("api_authorization_key") # Get authorization key from config vars
    }
    data = {
        'grant_type': 'client_credentials'
    }
    response = requests.post('https://api.princeton.edu:443/token', headers=headers, data=data)
    bearer_token = "Bearer "+response.json()['access_token']

    CURRENT_SEMESTER = ['']

    h = HTMLParser()

    def get_text(key, object, fail_ok=False):
        found = object.find("{http://as.oit.princeton.edu/xml/courseofferings-2_0}"+key)
        if fail_ok and (found is None or found.text is None):
            return found
        elif (found is None or found.text is None):
            ParseError("key " + key + " does not exist")
        else:
            return h.unescape(found.text)

    def get_current_semester():
        '''
        Gets the current semester information. 
        CANNOT get previous semesters information
        '''
        link = "https://api.princeton.edu:443/mobile-app/1.0.0/courses/terms"
        headers={
            "accept": "application/json",
            "Authorization": bearer_token
        }
        response1 = requests.get(link, headers=headers)
        tree = ElementTree.fromstring(response1.text)
        CURRENT_SEMESTER[0] = {
            'start_date': tree[0][5].text,
            'end_date': tree[0][6].text,
            'term_code': tree[0][0].text,
        }
        return CURRENT_SEMESTER[0]

    def scrape_all():
        """ scrape all events from Princeton's course webfeed
        """
        #global course_count
        #global section_count
        departments = list(DEPTS.keys())
        length = len(departments)
        courses = []
        for index, department in enumerate(departments):
            print('Scraping department {} of {}: {}'.format(index+1, length, department))
            courses += scrape(department)
        return courses

    # goes through the listings for this department
    def scrape(department):
        """ Scrape all events listed under department
        """
        link = "https://api.princeton.edu:443/mobile-app/1.0.0/courses/courses?term="+str(TERM_CODE)+"&subject="+department
        headers={
            "accept": "application/json",
            "Authorization": bearer_token
        }
        response = requests.get(link, headers=headers)
        tree = ElementTree.ElementTree(ElementTree.fromstring(response.text))
        root = tree.getroot()

        # ISSUE: no distribution area data
        parsed_courses = []
        for term in root:
            for item in term:
                for subjects in item:
                    for subject in subjects:
                        for courses in subject:
                            x = parse_course(courses,subject)
                            if x is not None:
                                parsed_courses.append(x)
        # print(parsed_courses)
        return parsed_courses

    def none_to_empty(text):
        if text is None:
            return ''
        else:
            return text

    def none_to_empty_list(x):
        if x is None:
            return []
        else:
            return x

    # Parse it for courses, sections, and lecture times (as recurring events)
    # If the course with this ID exists in the database, we update the course
    # Otherwise, create new course with the information
    def parse_course(course, subject):
        """ create a course with basic information.
        """
        try:
            #global new_course_count
            #global course_count
            return {
                "title": get_text('title', course),
                "guid": get_text('guid', course),
                "distribution_area": get_text('distribution_area', course, fail_ok=True),
                "description": none_to_empty(course.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}detail').find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}description').text),
                "semester": get_current_semester(),
                "professors": [parse_prof(x) for x in none_to_empty_list(course.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}instructors'))],
                "course_listings": parse_listings(course, subject),
                "sections": [parse_section(x) for x in none_to_empty_list(course.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}classes'))]
            }
        except Exception as inst:
            # print inst
            raise inst
            return None

    # may decide to make this function for just one prof/listing/section, then
    # do a map
    def parse_prof(prof):
        return {
            "full_name": get_text('full_name', prof)
        }

    def parse_listings(course, subject):
        def parse_cross_listing(cross_listing):
            return {
                'dept': get_text('subject', cross_listing),
                'code': get_text('catalog_number', cross_listing),
                'is_primary': False
            }
        cross_listings = [parse_cross_listing(
            x) for x in none_to_empty_list(course.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}crosslistings'))]
        primary_listing = {
            'dept': get_text('code', subject),
            'code': get_text('catalog_number', course),
            'is_primary': True
        }
        return cross_listings + [primary_listing]

    # NOTE: might need error handling for .find() -> none_to_empty or none_to_empty_list
    def parse_section(section):
        def parse_meeting(meeting):
            def get_days(meeting):
                days = ""
                for day in meeting.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}days'):
                    days += day.text + ' '
                return days[:10]

            def get_location(meeting):
                location = ''
                try:
                    building = meeting.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}building').find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}name').text
                    room = meeting.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}room').text
                    location = building + " " + room
                except Exception as e:
                    raise e
                finally:
                    return location
            # the times are in the format:
            # HH:MM AM/PM
            return {
                'start_time': get_text('start_time', meeting),
                'end_time': get_text('end_time', meeting),
                'days': get_days(meeting),
                'location': get_location(meeting),
            }
        # NOTE: section.find('schedule') doesn't seem to be used
        # NOTE: needs error handling for .find() -> none_to_empty or none_to_empty_list
        meetings = None
        schedule = section.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}schedule')
        if schedule is not None:
            meetings = schedule.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}meetings')
        return {
            'registrar_id': get_text('class_number', section),
            'name': get_text('section', section),
            'type': get_text('type_name', section)[0:3].upper(),
            'capacity': get_text('capacity', section),
            'enrollment': get_text('enrollment', section),
            'meetings': [parse_meeting(x) for x in none_to_empty_list(meetings)]
        }

    def remove_namespace(doc, namespace):
        """Hack to remove namespace in the document in place.
        """
        ns = u'{%s}' % namespace
        nsl = len(ns)
        for elem in doc.getiterator():
            if elem.tag.startswith(ns):
                elem.tag = elem.tag[nsl:]

    return scrape_all()

# scrape_parse_semester(1202)