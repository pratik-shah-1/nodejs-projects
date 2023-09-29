import mongoose from "mongoose";
import moment from 'moment';

const portfolioSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    title : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    techs : {
        type : [String],
        required : true
    },
    images : {
        type : [String],
        required : true,
    },
    links : {
        github : {
            type : String,
            required : true,
        },
        live : {
            type : String,
            default : null
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

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;