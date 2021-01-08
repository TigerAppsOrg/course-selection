# CourseSelection

CourseSelection is a web app that helps Princeton University students plan out their four-year course schedules. It began as a COS 333 project by Richard Chu, Barak Nehoran, Adeniji Ogunlana, and Daniel Leung.

You can visit CourseSelection at [courseselection.io](https://www.courseselection.io).

To learn about contributing to CourseSelection, take a look at the [contributing guidelines](https://github.com/CourseSelectionApp/courseselection/blob/master/CONTRIBUTING.md).

## Setup

### Pipenv

1. `git clone` this repository. Install [Python 3.6](https://www.python.org), [node.js](https://nodejs.org/en/), and [pipenv](https://github.com/pypa/pipenv) (which helps you manage your dependencies).

2. Run `cd courseselection && pipenv install` to install all of the current dependencies from Pipfile.lock.

3. Run `cd frontend && npm install` to install the necessary node modules for React to work.

4. Run `cd .. && cp .env-example .env`. Then, set the environment variables in your `.env` file; specifically, you should replace the value of `DATABASE_URL` with the proper database URL for your Postgres server. You should also fill in the `TIGERBOOK_USERNAME` and `TIGERBOOK_API_KEY` fields if you want the prepopulation of the user's year and major in the onboarding flow to work (you can get a TigerBook API key by following the instructions [here](https://github.com/alibresco/tigerbook-api)).

5. You can start a server with the environment variables in the file `.env` by running `pipenv run python manage.py runserver`. For development, run the webpack server (React) along with the Django server by calling `npm start` in the folder "frontend". Then you can navigate to `http://localhost:8000/` to see the app.

## Development

If you're using `pipenv` and you want to run one of the following commands, you should prefix it with `pipenv run` to make sure you're using the settings in your `.env` file. You can also run `pipenv shell`, which allows you to run the commands directly without prefixing.

#### Make migrations and update database

You can do this by running the following commands:

```
python manage.py makemigrations                             # Makes migrations based on models.py
python manage.py migrate                                    # Migrates the database
```

#### Custom django-admin commands

```
python manage.py courseselection_get_courses                      # Scrapes courses and puts them in the database
```

#### Load static data

To load the major mappings fixture, which populates the major table in the database, run the following command:

```
python manage.py loaddata major_mappings
```

## Deployment

Heroku deploys are set up to happen automatically based on the code in GitHub. You shouldn't need to deploy manually.

However, in the rare case that you do, then you can run the following command:
```
git push heroku <local_branch_name>:master                    # Push to the Heroku server
```
