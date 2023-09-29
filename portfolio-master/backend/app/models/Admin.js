import mongoose from "mongoose";
import moment from 'moment';

const adminSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    email : {
        required : true,
        unique: true,
        type : String,
    },
    password : {
        required : true,
        type : String,
    },
    token : {
        required : false,
        unique: true,
        type : String,
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

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;