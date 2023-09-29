import mongoose from "mongoose";
import moment from 'moment';

const resumeSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    resume : {
        id : {
            type : String,
            required : true    
        },
        path : {
            type : String,
            required : true
        }
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

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;