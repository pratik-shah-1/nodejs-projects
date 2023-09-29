import React from 'react';
import TypingImg from '../../upload/portfolio/typing/typing.png';
import ContactImg from '../../upload/portfolio/gaurav/contact.png';
import ClockImg from '../../upload/portfolio/typing/clock.png';

const Portfolio = () => {
  return (
    <div className='border rounded admin-form-container neumorphism'>
      <p className='text-center text-light bg-dark h5 py-3'>Portfolio</p>
      <form className='p-4' action=''>
        <input className='form-control mb-3' type='text' placeholder='Title' />
        <textarea
          className='form-control mb-3'
          style={{ height: '150px' }}
          placeholder='Details (Maximum 310 Characters)'
          name=''
        ></textarea>
        {/* <!-- LIST OF FUNCTIONALITY --> */}
        <div className='mb-3'>
          <div className='d-flex'>
            <input className='form-control' type='text' placeholder='Functionality' />
            <button className='btn btn-outline-primary'>
              <h6 className='h6 m-0'>
                <i className='fas fa-add'></i>
              </h6>
            </button>
          </div>
          <div className='d-flex flex-wrap'>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Login</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Login</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Login</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Login</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Login</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- PORTFOLIO-TECHS --> */}
        <div className='mb-3'>
          <div className='d-flex justify-content-between'>
            <select className='form-select' name='' id=''>
              <option value='html'>HTML</option>
              <option value='sass'>Sass</option>
              <option value='css'>CSS</option>
              <option value='js'>JS</option>
              <option value='jquery'>Jquery</option>
              <option value='bootstrap'>Bootstrap</option>
              <option value='react'>React</option>
              <option value='angular'>Angular</option>
              <option value='redux'>Redux</option>
              <option value='php'>PHP</option>
              <option value='laravel'>Laravel</option>
              <option value='nodejs'>NodeJS</option>
              <option value='mongodb'>MongoDB</option>
              <option value='mysql'>MySQL</option>
            </select>
            <button className='btn btn-outline-primary'>
              <h6 className='h6 m-0'>
                <i className='fas fa-add'></i>
              </h6>
            </button>
          </div>
          {/* <!-- ADDED TECH CONTAINER --> */}
          <div className='d-flex flex-wrap'>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>HTML</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>CSS</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>JS</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Sass</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Bootstrap</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>HTML</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>CSS</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>JS</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
            <div className='d-flex align-items-center border p-1 px-2 rounded m-2 mb-0 ms-0'>
              <p className='h6 m-0 me-2 small'>Sass</p>
              <button className='btn btn-sm btn-outline-danger border-0'>
                <i className='fas fa-close'></i>
              </button>
            </div>
          </div>
        </div>
        <input className='form-control mb-3' type='file' />
        {/* <!-- PORTFOLIO-SLIDER --> */}
        <div className='my-4'>
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
        <input className='form-control mb-3' type='text' placeholder='Github Link' />
        <input className='form-control mb-3' type='text' placeholder='Live Link' />
        <button className='btn btn-outline-primary'>
          <h6 className='m-0'>Save</h6>
        </button>
      </form>
    </div>
  );
};

export default Portfolio;
