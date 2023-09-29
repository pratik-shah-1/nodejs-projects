import mongoose from "mongoose";
import moment from 'moment';

const socialMedialLinkSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    platform : {
        type : String,
        required : true
    },
    name : {
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

const SocialMediaLink = mongoose.model('SocialMediaLink', socialMedialLinkSchema);

export default SocialMediaLink;