import SurveyAccessor from "../db_accessor/survey.accessor.js";

export default class SurveyController {
    static async getAllSurveys(req, res) {
        const surveys = await SurveyAccessor.getAllSurveys();
        res.render("physician_index", { surveys: surveys } );
    }

    static async getAssignedSurveys(req, res) {
        const surveys = await SurveyAccessor.getAllSurveys();
        const assignedSurveys = [];

        surveys.forEach((survey) => {
            if (survey.assigned) {
                assignedSurveys.push(survey);
            }
        });

        res.render("patient_index", { surveys: assignedSurveys } );
    }

    static getLoginPage(req, res) {
        res.render('login_page');
    }

    static getCreatePage(req, res) {
        const name = req.query.name;
        res.render('create_survey', {
            name: name
        });
    }

    static async postSurvey(req, res) {

        const name = req.body.name;
        const questionsArray = req.body.question;
        var questions = [];

        questionsArray.slice(1).forEach((question) => {
            questions.push({ question, response: "" });
        });

        const survey = {
            name: name,
            questions: questions,
        }

        await SurveyAccessor.createSurvey(survey);
        res.redirect("/physician");
    }

    static async assignSurvey(req, res) {

        const survey = req.body.name;

        await SurveyAccessor.assignSurvey(survey);
        res.redirect("/physician");
    }

    static async deleteSurvey(req, res) {

        const survey = req.body.name;

        await SurveyAccessor.deleteSurvey(survey);
        res.redirect("/physician");
    }

    static async getEditPage(req, res) {
        const name = req.query.name;
        const survey = await SurveyAccessor.getSurvey(name);
        var question = []
        var questions = survey.questions;

        questions.forEach((questions) => {
            question.push(questions.question);
        });


        res.render('edit_survey', {
            name: name,
            question: question,
        });
    }

    static async editSurvey(req, res) {

        const name = req.body.name;
        const questionsArray = req.body.question;
        var questions = [];

        questionsArray.slice(1).forEach((question, index) => {
            questions.push({question, response: ""});
        });

        await SurveyAccessor.editSurvey(name, questions);
        res.redirect("/physician");
    }

    static async getResponsePage(req, res) {
        const name = req.query.name;
        const survey = await SurveyAccessor.getSurvey(name);
        var question = [];
        var questions = survey.questions;

        questions.forEach((questions) => {
            question.push(questions.question);
        });

        res.render('take_survey', {
            name: name,
            question: question,
        });
    }

    static async postSurveyResponse(req, res) {

        const name = req.body.name;
        const questionsArray = req.body.question;
        const responseArray = req.body.response;
        var questions = [];

        questionsArray.forEach((question, index) => {
            const response = responseArray[index];
            questions.push({ question, response });
        });

        const survey = {
            name: name,
            assigned: false,
            questions: questions,
        }
        
        await SurveyAccessor.postSurveyResponse(survey);
        res.redirect("/patient");
    }
}