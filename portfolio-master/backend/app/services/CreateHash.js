import bcrypt from 'bcrypt';

const CreateHash = async(password)=>{
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export default CreateHash;