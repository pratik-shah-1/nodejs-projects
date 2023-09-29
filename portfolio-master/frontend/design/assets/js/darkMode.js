var dark_mode = 0;
const dark_icon = `<span class="fas fa-moon" style='color:#00091C;'></span>`;
const light_icon = `<span class="material-icons">light_mode</span>`;
const dark_title = `Switch to Dark Mode`;
const light_title = `Switch to Light Mode`;

$('document').ready(()=>{
    $('.dark-mode-btn').click(()=>{
        if(dark_mode==0){

            // --------SETUP-BUTTONS-----------
            dark_mode = 1;
            $('.dark-mode-btn').html(dark_icon).prop('title', light_title).removeClass('spin-animation');

            // --------DARK-BACKGROUND-----------
            $('body').addClass('dark-bg');
            $('.home-s2').addClass('dark-bg');
            $('.portfolio').addClass('dark-bg portfolio-dark-border');
            $('.contact-form-input').addClass('dark-border');

            // --------LIGHT-TEXT-----------
            $('.github-outline-btn').addClass('light-github-outline-btn');
            $('.logo > a').addClass('light-text');
            $('.navbar-active-link').addClass('light-text');
            $('.animate-text').addClass('light-text');
            $('.typed-cursor').addClass('light-text');
            $('.home-s2-portfolio-para > p:first-child').addClass('light-text');
            $('.home-s2-portfolio-para > p:last-child').addClass('gray-text');
            $('.swiper-pagination').addClass('swiper-pagination-light');
            $('.swiper-prev-btn').addClass('swiper-prev-btn-light');
            $('.swiper-next-btn').addClass('swiper-next-btn-light');
            $('.contact-form-title').addClass('light-text');
            $('.contact-form-label').addClass('light-text');
            $('.portfolio-title').addClass('light-text');
            $('.portfolio-details').addClass('gray-text');
        }
        else{
            // --------SETUP-BUTTONS-----------
            dark_mode = 0;
            $('.dark-mode-btn').html(light_icon).prop('title', dark_title).addClass('spin-animation');

            // --------DARK-BACKGROUND-----------
            $('body').removeClass('dark-bg');
            $('.home-s2').removeClass('dark-bg');
            $('.portfolio').removeClass('dark-bg portfolio-dark-border');
            $('.contact-form-input').removeClass('dark-border');

            // --------LIGHT-TEXT-----------
            $('.github-outline-btn').removeClass('light-github-outline-btn');
            $('.logo > a').removeClass('light-text');
            $('.navbar-active-link').removeClass('light-text');
            $('.animate-text').removeClass('light-text');
            $('.typed-cursor').removeClass('light-text');
            $('.home-s2-portfolio-para > p:first-child').removeClass('light-text');
            $('.home-s2-portfolio-para > p:last-child').removeClass('gray-text');
            $('.swiper-pagination').removeClass('swiper-pagination-light');
            $('.swiper-prev-btn').removeClass('swiper-prev-btn-light');
            $('.swiper-next-btn').removeClass('swiper-next-btn-light');
            $('.contact-form-title').removeClass('light-text');
            $('.contact-form-label').removeClass('light-text');
            $('.portfolio-title').removeClass('light-text');
            $('.portfolio-details').removeClass('gray-text');
        }
    });
});
