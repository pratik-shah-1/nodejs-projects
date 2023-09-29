import mongoose from "mongoose";
import moment from 'moment';

const otpSchema = new mongoose.Schema({
    id : mongoose.SchemaTypes.ObjectId,
    email : {
        required : true,
        unique: true,
        type : String,
    },
    otp : {
        required : true,
        type : Number,
    },
    createdAt : {
        type : String,
        immutable : true,
        default : () => moment().format('DD/MM/YYYY hh:mm A'),
    }
});

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;