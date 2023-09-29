// ----------MODELS----------
import Introduction from '../models/Introduction.js';

const IntroductionController = async(req, res)=>{    
    try{
        const result = await Introduction.find({});
        if(result.length==0){
            await Introduction.create({intro : req.body.intro});
            res.status(200).json({message:'Intro Added Successfully'});    
        }
        else{
            await Introduction.find({_id:result._id}).update({intro : req.body.intro});
            res.status(200).json({message:'Intro Updated Successfully'});    
        }
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error', errors:e});
    }
}

export default IntroductionController;