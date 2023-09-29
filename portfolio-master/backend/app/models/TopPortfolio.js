import mongoose from "mongoose";
import moment from 'moment';

const topPortfolioSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    title : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    links : {
        github : {
            type : String,
            required : true    
        },
        live : {
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

const SocialMediaLink = mongoose.model('SocialMediaLink', topPortfolioSchema);

export default SocialMediaLink;