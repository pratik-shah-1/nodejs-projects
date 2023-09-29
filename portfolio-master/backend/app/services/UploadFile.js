import cloudinary from 'cloudinary';

const DeleteFromCloud = (id)=>{
    return new Promise((resolve, reject)=>{
        cloudinary.v2.uploader.destroy(id, (error, result)=>{
            error? reject(false) : resolve(true);
        });
    });
}

const UploadOnCloud = (image)=>{
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, (error, result) => {            
            error? reject(error) : resolve({
                url:result.url, 
                id:result.public_id
            });
        })
    });
}

export {
    UploadOnCloud,
    DeleteFromCloud
};