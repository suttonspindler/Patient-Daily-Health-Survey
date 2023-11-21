import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    name: {type: String},
    assigned: { type: Boolean, default: false },
    questions: [
        {
            question: {type: String},
            response: {type: String},
        }
    ]
}, {
    collection: "surveys"
});

const db = mongoose.connection.useDb("HealthSurvey");
const Survey = db.model("Survey", SurveySchema);

export default Survey;