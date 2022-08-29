// MENU

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".header__menu-btn").forEach(item => {
  item.addEventListener("click", function() {
    let btn = this;
    let dropdown = this.parentElement.querySelector(".header__menu-dropdown");

    document.querySelectorAll(".header__menu-btn").forEach(el => {
      if (el != btn) {
        el.classList.remove("header__menu-btn--active");
      }
    });

    document.querySelectorAll(".header__menu-dropdown").forEach(el => {
      if (el != dropdown) {
        el.classList.remove("header__menu-dropdown--active");
      }
    })
    dropdown.classList.toggle("header__menu-dropdown--active");
    btn.classList.toggle("header__menu-btn--active")
  })
})

document.addEventListener("click", function(e) {
  let target = e.target;
  if (!target.closest(".header__menu-list")) {
    document.querySelectorAll(".header__menu-dropdown").forEach(el => {
        el.classList.remove("header__menu-dropdown--active");
    })
     document.querySelectorAll(".header__menu-btn").forEach(el => {
        el.classList.remove("header__menu-btn--active");
    });
  }
})
})

// Плавный скролл

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

// Меню поиска

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#search').addEventListener('click', function () {
    document.querySelector('#menu-search').classList.add('header__open-search--is-active')
  })
});

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#close-search').addEventListener('click', function () {
    document.querySelector('#menu-search').classList.remove('header__open-search--is-active')
  })
});

// Навигация открытие

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#burger').addEventListener('click', function () {
    document.querySelector('#nav-open').classList.add('header__nav-and-enter-open--is-active')
  })
});

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#close-nav').addEventListener('click', function () {
    document.querySelector('#nav-open').classList.remove('header__nav-and-enter-open--is-active')
  })
});

// Модальное окно

let swiperSlides = document.querySelector(".gallery").querySelectorAll(".gallery__swiper-slide");
let modal = document.querySelector(".modal");
let modalBtn = modal.querySelector(".modal__close-btn");
swiperSlides.forEach(el => {
  el.addEventListener("click", function() {
    let img = this.querySelector("img");
    let link = img.getAttribute("src");
    console.log(modal.querySelector("img"));
    animation(modal, "modal__block--active", "play");
    modal.querySelector("img").setAttribute("src", link);
  })
})
modalBtn.addEventListener("click", function() {
  animation(modal, "modal__block--active", "reverse");
});

function animation(el, Class, flag) {
  if (flag === "play") {
    el.style.display = "flex";
    setTimeout(function() {
      el.classList.add(Class);
    }, 50)
  } else if (flag === "reverse") {
    el.classList.remove(Class);
    setTimeout(function() {
      el.style.display = "none";
    }, 700)
  }
}

// Скрытие body

window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.gallery__swiper-slide').forEach (function(el) {
    el.addEventListener('click', function () {
      document.querySelector('#body').classList.add('modal__body-block--active')
    });
  });
});

window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.modal__close-btn').forEach (function(el) {
    el.addEventListener('click', function () {
      document.querySelector('#body').classList.remove('modal__body-block--active')
    });
  });
});



