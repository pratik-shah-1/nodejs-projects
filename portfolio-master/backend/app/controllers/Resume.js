// ----------MODULES----------
import { UploadOnCloud, DeleteFromCloud } from '../services/UploadFile.js';

// ----------MODELS----------
import Resume from '../models/Resume.js';

const ResumeController = async(req, res)=>{
    let path = req.body.path;
    let id = req.body.id;
    try{
        if(id!==undefined && id!==null){
            await DeleteFromCloud(id);
        }
        const result = await UploadOnCloud(path);    
        res.status(200).json({message:'File Upload Successfully.', data:result});
    }
    catch(e){
        res.status(500).json({message:'Internal Server Error', errors:e});
    }
}

export default ResumeController;
