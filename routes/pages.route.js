import express from "express";
import path from "path";
import SurveyController from "../controllers/survey.controller.js";

const router = express.Router()

router.route("/css/index.css").get((req, res) => {
    res.sendFile(path.resolve() + '/css/index.css');
});

router.route("/css/style.css").get((req, res) => {
    res.sendFile(path.resolve() + "/css/style.css");
});

router.route("/scripts/create.js").get((req, res) => {
    res.sendFile(path.resolve() + '/scripts/create.js');
});

router.route("/scripts/edit.js").get((req, res) => {
    res.sendFile(path.resolve() + '/scripts/edit.js');
});

router.route("/").get(SurveyController.getLoginPage);

router.route("/physician").get(SurveyController.getAllSurveys);

router.route("/patient").get(SurveyController.getAssignedSurveys);

router.route("/delete").post(SurveyController.deleteSurvey);

router
  .route("/assign")
  .post(SurveyController.assignSurvey);

router
    .route("/create")
    .get(SurveyController.getCreatePage)
    .post(SurveyController.postSurvey);

router
    .route("/take-survey")
    .get(SurveyController.getResponsePage)
    .post(SurveyController.postSurveyResponse);

router
    .route("/edit")
    .get(SurveyController.getEditPage)
    .post(SurveyController.editSurvey);

export default router