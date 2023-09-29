import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import CodeImg from '../../assets/img/parallex/code.png';
import DatabaseImg from '../../assets/img/parallex/database.png';
import CloudImg from '../../assets/img/parallex/cloud.png';
import Avatar from '../../assets/img/avatar/avatar.glb';
import TypingImg from '../../assets/upload/portfolio/typing/typing.png';
import ClockImg from '../../assets/upload/portfolio/typing/clock.png';
import ContactImg from '../../assets/upload/portfolio/gaurav/contact.png';
import Contact from './Contact';

const Home = () => {
  const animatedTextElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(animatedTextElement.current, {
      strings: ['Pratik Jadav', 'Frontend Developer', 'Backend Developer'],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className='home-s1'>
        <div className='home-s1-main'>
          <div className='home-s1-main-left'>
            <p className='hi-i-am'>Hi, I am</p>
            <span className='animate-text' ref={animatedTextElement}></span>
            <p className='my-intro'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure voluptatibus numquam
              eos dolorem maiores repellendus obcaecati veniam tempora similique aperiam.
            </p>
            <a className='rounded-btn' style={{ width: '150px' }} href=''>
              View Portfolio
            </a>
          </div>
          <div className='home-s1-main-right'>
            <model-viewer
              bounds='tight'
              src={Avatar}
              camera-controls
              autoplay
              camera-target='0m 0.98m 0m'
            />
          </div>
        </div>
        <div className='home-s1-bg-icons'>
          <img src={CodeImg} className='parallex' data-speed='-0.2' alt='' />
          <img src={DatabaseImg} className='parallex' data-speed='0.3' alt='' />
          <img src={CloudImg} className='parallex' data-speed='-0.4' alt='' />
          <img src={CloudImg} className='parallex' data-speed='-0.5' alt='' />
          <img src={CodeImg} className='parallex' data-speed='-0.6' alt='' />
        </div>
      </div>
      {/* ----------HOME-S2---------- */}
      <div className='home-s2'>
        <div className='home-slider'>
          <div className='swiper my-swiper'>
            <div className='swiper-wrapper'>
              <div className='swiper-slide'>
                <img src={TypingImg} alt='' />
              </div>
              <div className='swiper-slide'>
                <img src={ContactImg} alt='' />
              </div>
              <div className='swiper-slide'>
                <img src={ClockImg} alt='' />
              </div>
            </div>
            <div className='swiper-pagination'></div>
            <button className='swiper-prev-btn'>
              <i className='fas fa-chevron-circle-left'></i>
            </button>
            <button className='swiper-next-btn'>
              <i className='fas fa-chevron-circle-right'></i>
            </button>
          </div>
        </div>
        <div className='home-s2-portfolio-para'>
          <p>Gaming Portfolio Website</p>
          <p>
            Lorem Ipsum not dolar Lorem Ipsum not dolar Lorem Ipsum not dolar Lorem Ipsum not dolar
            Lorem Ipsum not dolarLorem Ipsum not dolarLorem{' '}
          </p>
        </div>
        <div className='home-s2-portfolio-btns'>
          <button className='github-outline-btn'>
            <i className='fab fa-github'></i>
            <span>Github</span>
          </button>
          <button className='rounded-btn'>
            Visit Site<i className='fas fa-arrow-right'></i>
          </button>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default Home;
