$('.scroll-up-btn').click(()=>{
    window.scrollTo(0, 0);
});

var swiper = new Swiper(".my-swiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-next-btn",
        prevEl: ".swiper-prev-btn",
    },
});

const typed = new Typed('.animate-text',{
    strings : ['Pratik Jadav', 'Frontend Developer', 'Backend Developer'],
    typeSpeed : 100,
    backSpeed : 100,
    loop : true 
});