import React from 'react';
import TypingImg from '../../upload/portfolio/typing/typing.png';
import ContactImg from '../../upload/portfolio/typing/clock.png';
import ClockImg from '../../upload/portfolio/typing/clock.png';

const Portfolio = () => {
  return (
    <div className='portfolio-container'>
      <div className='portfolio'>
        <p className='portfolio-title'>
          Wall Clock{' '}
          <a href='https://gauravbarai01.000webhostapp.com/' target='_blank' rel='noreferrer'>
            https://gauravbarai01.000webhostapp.com/
          </a>
        </p>
        <div className='portfolio-left'>
          <p className='portfolio-details'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi officia eaque ab
            aspernatur dolor, illum animi corporis laboriosam labore voluptatibus recusandae omnis
            nesciunt accusantium deserunt fugit vero beatae provident! Sequi officia assumenda
            dignissimos libero magnam ducimus magni quidem et.{' '}
            <a className='read-more' href=''>
              read more
            </a>
          </p>
          <div className='portfolio-techs'>
            <button className='html-btn' title='HTML'>
              <i className='fab fa-html5'></i>
            </button>
            <button className='css-btn' title='CSS'>
              <i className='fab fa-css3'></i>
            </button>
            <button className='sass-btn' title='Scss'>
              <i className='fab fa-sass'></i>
            </button>
            <button className='bootstrap-btn' title='Bootstrap'>
              <i className='fab fa-bootstrap'></i>
            </button>
            <button className='js-btn' title='Javascript'>
              <i className='fab fa-js'></i>
            </button>
            <button className='jquery-btn' title='Jquery'>
              <i className='fi fi-jquery'></i>
            </button>
            <button className='react-btn' title='React Js'>
              <i className='fab fa-react'></i>
            </button>
            <button className='redux-btn' title='Redux'>
              <i className='fi fi-redux'></i>
            </button>
            <button className='php-btn' title='PHP'>
              <i className='fab fa-php'></i>
            </button>
            <button className='laravel-btn' title='Laravel'>
              <i className='fab fa-laravel'></i>
            </button>
            <button className='node-btn' title='Node Js'>
              <i className='fab fa-node-js'></i>
            </button>
            <button className='mongodb-btn' title='MongoDB'>
              <i className='fi fi-mongodb'></i>
            </button>
            <button className='mysql-btn' title='MySQL'>
              <i className='fi fi-mysql'></i>
            </button>
          </div>
        </div>
        <div className='portfolio-right'>
          <div className='portfolio-slider'>
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
            </div>
          </div>
          <div className='portfolio-btns'>
            <a href='' className='github-outline-btn'>
              <i className='fab fa-github'></i>
              <span>Github</span>
            </a>
            <a href='' className='rounded-outline-btn'>
              Visit Website<i className='fas fa-external-link-alt'></i>
            </a>
            <a href='' className='rounded-btn'>
              View Details
            </a>
          </div>
        </div>
      </div>

      <div className='portfolio'>
        <p className='portfolio-title'>
          Wall Clock{' '}
          <a href='https://gauravbarai01.000webhostapp.com/' target='_blank' rel='noreferrer'>
            https://gauravbarai01.000webhostapp.com/
          </a>
        </p>
        <div className='portfolio-left'>
          <p className='portfolio-details'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi officia eaque ab
            aspernatur dolor, illum animi corporis laboriosam labore voluptatibus recusandae omnis
            nesciunt accusantium deserunt fugit vero beatae provident! Sequi officia assumenda
            dignissimos libero magnam ducimus magni quidem et.{' '}
            <a className='read-more' href=''>
              read more
            </a>
          </p>
          <div className='portfolio-techs'>
            <button className='html-btn' title='HTML'>
              <i className='fab fa-html5'></i>
            </button>
            <button className='css-btn' title='CSS'>
              <i className='fab fa-css3'></i>
            </button>
            <button className='sass-btn' title='Scss'>
              <i className='fab fa-sass'></i>
            </button>
            <button className='bootstrap-btn' title='Bootstrap'>
              <i className='fab fa-bootstrap'></i>
            </button>
            <button className='js-btn' title='Javascript'>
              <i className='fab fa-js'></i>
            </button>
            <button className='jquery-btn' title='Jquery'>
              <i className='fi fi-jquery'></i>
            </button>
            <button className='react-btn' title='React Js'>
              <i className='fab fa-react'></i>
            </button>
            <button className='redux-btn' title='Redux'>
              <i className='fi fi-redux'></i>
            </button>
            <button className='php-btn' title='PHP'>
              <i className='fab fa-php'></i>
            </button>
            <button className='laravel-btn' title='Laravel'>
              <i className='fab fa-laravel'></i>
            </button>
            <button className='node-btn' title='Node Js'>
              <i className='fab fa-node-js'></i>
            </button>
            <button className='mongodb-btn' title='MongoDB'>
              <i className='fi fi-mongodb'></i>
            </button>
            <button className='mysql-btn' title='MySQL'>
              <i className='fi fi-mysql'></i>
            </button>
          </div>
        </div>
        <div className='portfolio-right'>
          <div className='portfolio-slider'>
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
            </div>
          </div>
          <div className='portfolio-btns'>
            <a href='' className='github-outline-btn'>
              <i className='fab fa-github'></i>
              <span>Github</span>
            </a>
            <a href='' className='rounded-outline-btn'>
              Visit Website<i className='fas fa-external-link-alt'></i>
            </a>
            <a href='' className='rounded-btn'>
              View Details
            </a>
          </div>
        </div>
      </div>

      <div className='portfolio'>
        <p className='portfolio-title'>
          Wall Clock{' '}
          <a href='https://gauravbarai01.000webhostapp.com/' target='_blank' rel='noreferrer'>
            https://gauravbarai01.000webhostapp.com/
          </a>
        </p>
        <div className='portfolio-left'>
          <p className='portfolio-details'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sequi officia eaque ab
            aspernatur dolor, illum animi corporis laboriosam labore voluptatibus recusandae omnis
            nesciunt accusantium deserunt fugit vero beatae provident! Sequi officia assumenda
            dignissimos libero magnam ducimus magni quidem et.{' '}
            <a className='read-more' href=''>
              read more
            </a>
          </p>
          <div className='portfolio-techs'>
            <button className='html-btn' title='HTML'>
              <i className='fab fa-html5'></i>
            </button>
            <button className='css-btn' title='CSS'>
              <i className='fab fa-css3'></i>
            </button>
            <button className='sass-btn' title='Scss'>
              <i className='fab fa-sass'></i>
            </button>
            <button className='bootstrap-btn' title='Bootstrap'>
              <i className='fab fa-bootstrap'></i>
            </button>
            <button className='js-btn' title='Javascript'>
              <i className='fab fa-js'></i>
            </button>
            <button className='jquery-btn' title='Jquery'>
              <i className='fi fi-jquery'></i>
            </button>
            <button className='react-btn' title='React Js'>
              <i className='fab fa-react'></i>
            </button>
            <button className='redux-btn' title='Redux'>
              <i className='fi fi-redux'></i>
            </button>
            <button className='php-btn' title='PHP'>
              <i className='fab fa-php'></i>
            </button>
            <button className='laravel-btn' title='Laravel'>
              <i className='fab fa-laravel'></i>
            </button>
            <button className='node-btn' title='Node Js'>
              <i className='fab fa-node-js'></i>
            </button>
            <button className='mongodb-btn' title='MongoDB'>
              <i className='fi fi-mongodb'></i>
            </button>
            <button className='mysql-btn' title='MySQL'>
              <i className='fi fi-mysql'></i>
            </button>
          </div>
        </div>
        <div className='portfolio-right'>
          <div className='portfolio-slider'>
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
            </div>
          </div>
          <div className='portfolio-btns'>
            <a href='' className='github-outline-btn'>
              <i className='fab fa-github'></i>
              <span>Github</span>
            </a>
            <a href='' className='rounded-outline-btn'>
              Visit Website<i className='fas fa-external-link-alt'></i>
            </a>
            <a href='' className='rounded-btn'>
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
