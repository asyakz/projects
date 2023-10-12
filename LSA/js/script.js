const swiper = new Swiper('.promotion-swiper', {

  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-promotion',
    prevEl: '.swiper-button-prev-promotion',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

});

const swiper1 = new Swiper('.products-swiper', {

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1
    },
    // when window width is >= 420px
    420: {
      slidesPerView: 2
    },
    // when window width is >= 730px
    730: {
      slidesPerView: 4
    }
  },

  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-products',
    prevEl: '.swiper-button-prev-products',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  spaceBetween: 10

});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
