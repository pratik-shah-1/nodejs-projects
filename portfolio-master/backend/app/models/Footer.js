import mongoose from "mongoose";
import moment from 'moment';

const footerSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    line : {
        type : String,
        required : true
    },
    link : {
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

const Footer = mongoose.model('Footer', footerSchema);

export default Footer;