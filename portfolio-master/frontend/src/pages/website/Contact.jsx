import React from 'react';
import ContactImg from '../../assets/img/parallex/contact.png';
import EnvelopeImg from '../../assets/img/parallex/envelope.png';
import MessageImg from '../../assets/img/parallex/message.png';
import UserImg from '../../assets/img/parallex/user.png';
import MailImg from '../../assets/img/social_media/mail.png';
import SkypeImg from '../../assets/img/social_media/skype.png';
import GitImg from '../../assets/img/social_media/git.png';
import LinkedInImg from '../../assets/img/social_media/linkedin.png';

const Contact = () => {
  return (
    <div className='contact-section'>
      <div className='contact-section-bg-icons'>
        <img src={ContactImg} alt='' />
        <img src={UserImg} alt='' />
        <img src={EnvelopeImg} alt='' />
        <img src={MessageImg} alt='' />
        <img src={UserImg} alt='' />
      </div>

      <form className='contact-form' action=''>
        <p className='contact-form-title'>Get in Touch</p>
        <div>
          <div>
            <label className='contact-form-label'>Name</label>
            <input className='contact-form-input' type='text' />
          </div>
          <div>
            <label className='contact-form-label'>Email</label>
            <input className='contact-form-input' type='text' />
          </div>
        </div>
        <div>
          <label className='contact-form-label'>Message</label>
          <textarea className='contact-form-input' name='' />
        </div>
        <div>
          <button className='rounded-btn'>Send</button>
        </div>
      </form>

      <div className='social-media-links'>
        <div>
          <img src={MailImg} alt='' />
          <a href='' mailto='pratikjadav29@gmail.com' target='_blank'>
            pratikjadav29@gmail.com
          </a>
        </div>
        <div>
          <img src={GitImg} alt='' />
          <a href='https://github.com/jadavpratik' target='_blank' rel='noreferrer'>
            jadavpratik
          </a>
        </div>
        <div>
          <img src={LinkedInImg} alt='' />
          <a href='https://www.linkedin.com/in/jadavpratik/' target='_blank' rel='noreferrer'>
            jadavpratik
          </a>
        </div>
        <div>
          <img src={SkypeImg} alt='' />
          <a href='' target='_blank'>
            live:.cid.223d96c142d1ae07
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
