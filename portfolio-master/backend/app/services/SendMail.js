import nodemailer from 'nodemailer';

const SendMail = async(content)=>{

    let transporter = nodemailer.createTransport({
        host  : process.env.EMAIL_HOST,
        port  : process.env.EMAIL_PORT,
        secure: true,
        auth  : {
           user : process.env.EMAIL_ADRS,
           pass : process.env.EMAIL_PSWD
        },
        // debug : false,
        // logger: true 
    });

    let info = await transporter.sendMail({
        from    : {
            name : 'Portfolio29',
            address : process.env.EMAIL_ADRS
        },
        to      : process.env.EMAIL_RCVR,
        subject : "Portfolio29",
        text    : content,
    });    

}

export default SendMail;
