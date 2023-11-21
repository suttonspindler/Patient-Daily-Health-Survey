# Patient-Daily-Health-Survey

## How to use:

Upon running the site, you will be greeted by the login page with two options: “Physician Login” and “Patient Login”.

Choosing Physician Login takes you to the physician page, where you can view surveys that have already been created, as well as the option to create a new survey.  To create a new survey, type in the name you want the survey to have (such as the date if it is a daily survey) then hit “Create a new survey!”  This will take you to the survey creation page, where you can type in the questions you want the survey to include.  Add a new question by clicking “Add question” or remove a question by clicking “Remove question” to remove the corresponding question.  When you are done, select “Submit survey” to submit it to the database.  This will redirect you to the physician page, where you should see the survey you just created along the list of surveys.

On the Physician page, all surveys that are already part of the database have three options: Assign, Edit, and Delete.  Assign assigned the survey to the patient, while also changing the assign option to an Unassign button.  Selecting Unassign will unassign the survey from the patient, and change the Unassign button back into an Assign button.  Selecting edit will take you back to the survey editor page which is practically identical to the survey creation page.  The major difference is that the questions which are already part of the survey will be filled in as text fields.  They can be edited to edit the current questions on the survey, or questions can be added as well as removed.  The final feature, Delete, deletes the survey from the physician page and from the database.

Choosing Patient Login allows you to view all surveys that have been assigned by the physician.  Each survey has the “Take survey” option, where the patient can respond to every question that is part of the survey, then select “Submit survey” to submit the survey.  Doing so will remove the survey from the Patient page (it becomes unassigned) and the patient’s responses will be sent and stored to the database.

## Running the project:
- Necessary software to install:
  
  Docker Desktop
  
  Node.js

- Clone the repository to your local file system
- Add the ```.env``` file to the root folder (provided upon request)
- Open a terminal at the root folder
- Run the commands:

  ```npm i```
  
  ```docker build -t survey-image .```
  
  ```docker compose build```
  
  ```docker compuse up -d```

- Go to the link http://localhost:3000/

## Documentation

### controllers folder:

#### class SurveyController from survey.controller.js:

getAllSurveys:
gets every surveys and serves them as part of the physician main page

getAssignedSurveys:
get every survey that has its “assigned” variable valued as “true”
serve these surveys as part of the patient_index page to the patients

getLoginPage:
render the login_page to the user, where they can choose to either be a physician or a patient

getCreatePage:
get the name from the query, then use it to serve the survey creation page using the given name

postSurvey:
after a survey has been submitted by a physician, reformat it so that every question provided is assigned with an empty (“”) response
post the newly create survey to the database using SurveyAccessor
redirect the user to the physician page

assign:
flip the status of the survey, from assign to unassigned, or from unassigned to assign
refresh the page

deleteSurvey:
delete the survey from the database using SurveyAccessor
refresh the page

getEditPage:
retrieve the selected survey from the database using SurveyAccessor
store all the questions in a list
pass the questions list and name to the survey editor page

editSurvey:
assigned each question with an empty (“”) response
replace the edited survey in the database using SurveyAccessor

getResponsePage:
get the survey from the database using SurveyAccessor with the name provided
store the questions into a new list, then use this list and the survey to render the survey response page for the patient

postSurveyResponse:
pair up all the questions and patient responses together
change the assigned value to false
store the updated patient data to the database using SurveyAccessor
redirect to the patient page

### css folder:

#### index.css:
css styling for the surveys on both the patient_index page and physician_index page

#### style.css:
general styling for every page across the site

### db folder:

#### class Connection from connection.js:

open:
open a connection to the MongoDB database, so the SurveyAccessor can add, manipulate, or remove Survey data

### db_accessor folder:

#### class SurveyAccessor from survey.accessor.js:

getSurvey(name):
get a Survey from the database using the provided name
return the survey

getAllSurveys():
push each survey from the database into a new list surveys[]
return the list of every survey found within the database

createSurvey(surveyDoc):
post a new survey to the database using the provided surveyDoc data
return the newly created survey

editSurvey(name, questions):
find the survey that matched the name provided
replace the set of questions with the newly provided questions

assignSurvey(name):
get the survey from the database using the provided name
update the survey in the database by flipping its “assigned” value

deleteSurvey(name):
delete the survey from the database using the name provided

postSurveyResponse(surveyDoc):
update the survey stored in the database using the data provided within surveyDoc
update the assigned value
update the list of questions

### models folder:

#### survey.js:
defines a SurveySchema - a data scheme that every Survey entity within the database needs to follow
name (type: String) - the name of the survey
assigned (type: Boolean, default: false) - whether the survey is assigned to the patient or not
questions ([ question (type: String); response (type: String) ]) - a pair of question-responses on the form.  A question is a question that the physician wants to include on the survey, and the response is where the patient response will be stored
The schema is stored as part of the “surveys” collection in the database

### routes folder:

#### pages.routes.js:
routes css and script files written in js to their locations, so that ejs/html can access them
the rest of the file consists of routing certain actions to methods performed by the SurveyController:
/: gets the login page
/physician: get physician homepage
/patient: get patient homepage
/delete: delete survey from the database
/assign: “flip” a survey’s assigned variable between true and false
/create: go to the survey creation page, then post it to the database
/take-survey: a patient takes a survey, then the survey in the database gets updates with their responses
/edit: allows a physician to edit a survey’s questions, then update the survey in the database with the new set of questions

### scripts folder:

#### create.js and edit.js:

nearly identical scripts, the difference being that create.js is for the survey creation page, and edit.js is for the survey editor page.
involves the enhancements of the form’s functionality by allowing users to dynamically add and remove input fields

### views folder:

#### create_survey.ejs:
The survey creation page, which allows physicians to create a survey.  They can add as many questions they want, and can get rid of a question

#### edit_survey.ejs:
The survey edit page, which allows physicians to edit a survey which has already been created and is stored in the database.  They can add more questions, and remove or edit pre existing questions

#### login_page.ejs:
The first page of the website.  The user can select to login either as a physician or as a patient

#### patient_index.ejs
The patient homepage.  Here they can view and complete surveys which have been assigned to them

#### physician_index.ejs:
The physician homepage.  Here they can create, edit, delete, and assign/unassign surveys

#### take_survey.ejs:
The page which allows patients to view and complete a survey which has been assigned to them
