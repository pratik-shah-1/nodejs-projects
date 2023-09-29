import mongoose from "mongoose";
import moment from 'moment';

const introductionSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    intro : {
        type : String,
        required : true
    },
    createdAt : {
        type : String,
        immutable : true,
        default : () => moment().format('DD/MM/YYYY hh:mm A'),
    },
    updatedAt : {
        type : String,
        immutable : false,
        default : () => moment().format('DD/MM/YYYY hh:mm A'),
    }
});

const Introduction = mongoose.model('Introduction', introductionSchema);

export default Introduction;