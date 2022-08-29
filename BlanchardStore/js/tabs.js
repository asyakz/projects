document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tabs-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function(tabsBtn) {
        tabsBtn.classList.remove('tab-content--active')
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content--active');
    });
  });
});

// Активный цвет

window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tabs-btn').forEach (function(tabsColor) {
    tabsColor.addEventListener('click', function (event) {
      activeColorElement = document.querySelector('.catalog__tabs--active-color');
      if (activeColorElement != null) activeColorElement.classList.remove('catalog__tabs--active-color');
      event.target.classList.add('catalog__tabs--active-color')
    });
  });
});

