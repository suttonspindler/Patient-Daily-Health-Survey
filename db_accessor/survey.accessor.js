import Connection from "../db/connection.js";
import Survey from "../models/survey.js";

export default class SurveyAccessor {
    static async getSurvey(name) {
        try {
          await Connection.open("surveys");
          const survey = await Survey.findOne({ name: name });
          return survey;
        } catch (e) {
          throw e;
        }
    }

    static async getAllSurveys() {
        await Connection.open("surveys");
        try {
            await Connection.open("surveys");
            const surveys = [];
            for await (const doc of Survey.find()) {
                surveys.push(doc);
            }
            return surveys;
        } catch (e) {
            throw e;
        }
    }

    static async createSurvey(surveyDoc) {
        try {
            await Connection.open("surveys");
            const survey = await Survey.create(surveyDoc);
            return survey;
        } catch (e) {
            throw e;
        }
    }

    static async editSurvey(name, questions) {
        try {
            await Connection.open("surveys");
            await Survey.findOneAndUpdate({ name: name }, { questions: questions });
        } catch (e) {
            throw e;
        }
    }

    static async assignSurvey(name) {
        try {
            await Connection.open("surveys");
            const survey = await SurveyAccessor.getSurvey(name);
            await Survey.findOneAndUpdate({ name: name }, { assigned: !survey.assigned });
        } catch (e) {
            throw e;
        }
    }

    static async deleteSurvey(name) {
        try {
            await Connection.open("surveys");
            const result = await Survey.deleteOne({ name: name });
            return result;
        } catch (e) {
            throw e;
        }
    }

    static async postSurveyResponse(surveyDoc) {
        try {
            await Connection.open("surveys");
            await Survey.findOneAndUpdate({ name: surveyDoc.name }, { assigned: surveyDoc.assigned });
            await Survey.findOneAndUpdate({ name: surveyDoc.name }, { questions: surveyDoc.questions });
        } catch (e) {
            throw e;
        }
    }
}