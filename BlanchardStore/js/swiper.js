var heroSwiper = new Swiper('.hero__swiper', {

  autoplay: {
    delay: 3000,
  },

  disableOnInteraction: {
    boolean: false,
  },

  scrollbar: {
    hide: true,
  },

  loop: {
    boolean: true,
  },

  simulateTouch: {
    boolean: true,
  },

  FollowFinger: {
    boolean: true,
  },
});

var gallerySwiper = new Swiper('.gallery__swiper', {

  // Navigation arrows
  navigation: {
    nextEl: '.gallery__swiper-button-next',
    prevEl: '.gallery__swiper-button-prev',
  },

  pagination: {
    el: '.gallery__pagination-numbers',
    type: 'fraction',
  },

  speed: 500,

  // And if we need scrollbar
  scrollbar: {
    hide: true,
  },

  simulateTouch: {
    boolean: true,
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
  },

  reverseDirection: {
    boolean: true,
  },

    // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    // when window width is >= 380px
    380: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    // when window width is >= 1140px
    1140: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  },
});

var eventsSwiper = new Swiper('.events__swiper', {

  speed: 500,

// Responsive breakpoints
breakpoints: {
  // when window width is >= 320px
  320: {
    slidesPerView: 1,
    slidesPerGroup: 1,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 30,
  },
  // when window width is >= 1024px
  1024: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 30,
  },
  // when window width is >= 1700px
  1700: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
  },
},

  navigation: {
    nextEl: '.events__swiper-button-next',
    prevEl: '.events__swiper-button-prev',
  },

  pagination: {
    el: '.events__swiper-pagination',
    type: 'bullets',
    clickable: {
      boolean: true,
    },
  },

  scrollbar: {
    hide: true,
  },

  disableOnInteraction: {
    boolean: false,
  },

  simulateTouch: {
    boolean: true,
  },

  FollowFinger: {
    boolean: true,
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
  },
});

var projectsSwiper = new Swiper('.projects__swiper', {

  // Responsive breakpoints
breakpoints: {
  // when window width is >= 320px
  320: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    // spaceBetween: 20
  },
  // when window width is >= 520px
  640: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 34,
  },
  // when window width is >= 640px
  769: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 50,
  },
  // when window width is >= 1500px
  1500: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
  },
},

  speed: 500,

  navigation: {
    nextEl: '.projects__swiper-button-next',
    prevEl: '.projects__swiper-button-prev',
  },

  disableOnInteraction: {
    boolean: false,
  },

  simulateTouch: {
    boolean: true,
  },

  FollowFinger: {
    boolean: true,
  },

  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
  },
});
