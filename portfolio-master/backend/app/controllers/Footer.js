// ----------MODELS----------
import Footer from '../models/Footer.js';

const FooterController = async(req, res)=>{
    try{
        const result = await Footer.find({});
        if(result.length==0){
            await Footer.create({
                line : req.body.line,
                link : req.body.link
            });
            res.status(200).json({message:'Footer Added Successfully'});    
        }
        else{
            await Footer.find({_id:result._id}).update({
                line : req.body.line,
                link : req.body.link
            });
            res.status(200).json({message:'Footer Updated Successfully'});    
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error', errors:e});
    }
}

export default FooterController;