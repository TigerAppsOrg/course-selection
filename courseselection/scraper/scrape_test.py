from lxml import etree
from html.parser import HTMLParser
from urllib.request import urlopen
import re
from xml.etree import ElementTree
import requests

TERM_CODE=1202
CURRENT_SEMESTER = ['']
h = HTMLParser()
bearer_token = "Bearer ZDRiNmI3OTctYTQxNS0zYWFlLWI3ZDMtN2IwMzBmMDQ2MTZiOmNvdXJzZXMtYXBwc0BjYXJib24uc3VwZXI="

class ParseError(Exception):

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)

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

# ISSUE: can only get current semester information and not previous semesters
#        might get away with this if we don't have any use for 'start_date' and 'end_date'
def get_current_semester():
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
def get_text(key, object, fail_ok=False):
    found = object.find("{http://as.oit.princeton.edu/xml/courseofferings-2_0}"+key)
    if fail_ok and (found is None or found.text is None):
        return found
    elif (found is None or found.text is None):
        ParseError("key " + key + " does not exist")
    else:
        return h.unescape(found.text)
def parse_course(course, subject):
    """ create a course with basic information.
    """
    try:
        #global new_course_count
        #global course_count
        # print(get_text('title', course))
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
        x) for x in none_to_empty_list(course.find('crosslistings'))]
    primary_listing = {
        'dept': get_text('code', subject),
        'code': get_text('catalog_number', course),
        'is_primary': True
    }
    return cross_listings + [primary_listing]

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
    meetings = None
    schedule = section.find('schedule')
    if schedule is not None:
        meetings = schedule.find('meetings')
    return {
        'registrar_id': get_text('class_number', section),
        'name': get_text('section', section),
        'type': get_text('type_name', section)[0:3].upper(),
        'capacity': get_text('capacity', section),
        'enrollment': get_text('enrollment', section),
        'meetings': [parse_meeting(x) for x in none_to_empty_list(meetings)]
    }

link = "https://api.princeton.edu:443/mobile-app/1.0.0/courses/courses?term=1202&subject=MAT"
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
                    # for course in courses:
                    # print(courses.tag, courses.attrib)
                    # print(courses)
                    # print(courses.find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}detail')
                    # .find('{http://as.oit.princeton.edu/xml/courseofferings-2_0}description')
                    # .text)
                    x = parse_course(courses,subject)
                    if x is not None:
                        parsed_courses.append(x)
                    # print(x)
# print(parsed_courses)