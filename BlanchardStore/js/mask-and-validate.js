var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);

new JustValidate('.contacts__form', {

  colorWrong: 'var(--wrong-red-color)',

  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 30
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
  },

  messages: {
    name: {
      remote: 'Подходит',
      required: 'Требуется ввести имя',
      minLength: 'Нужно минимум два символа',
      maxLength: 'Слишком много букв!',
      email: 'Все очень плохо'
    },
    tel: {
      remote: 'Подходит',
      required: 'Требуется ввести телефон',
      minLength: 'Нужно 10 цифр',
      maxLength: 'Нужно не более 10 цифр',
      email: 'Все печально',
      function: 'Введите только 10 цифр'
    },
  },
});
