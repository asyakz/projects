Array.prototype.forEach.call(
  document.querySelectorAll('.simplebar'),
  el => new SimpleBar(el, {
    autoHide: false,
    scrollbarMaxSize: 28,
  })
);

