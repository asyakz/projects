export function mask(selector) {
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);
}

export function unmask(selector) {
  selector.inputmask.remove();
}

export const validation = new window.JustValidate('#modal__form-new-client', {
  errorLabelCssClass: 'validation',
  errorsContainer: document.getElementById('modal__validation-container'),
  lockForm: true,
});

export function addValidation(type, id) {
  if (type == 'Phone') {
    validation.addField(`#${id}`, [
      {
        validator: (value) => document.getElementById(id).inputmask.unmaskedvalue().length === 10,
        errorMessage: 'Введите 10 цифр'
      },
    ]);
  } else if (type == 'Email') {
    validation.addField(`#${id}`, [
      {
        rule:'email',
        errorMessage: 'Введите корректный E-mail'
      }
    ])
  }
}

validation.addField('#modal__input-surname', [
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Фамилия слишком короткая'
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Фамилия слишком длинная'
  },
  {
    rule: 'required',
    errorMessage: 'Поле обязательно для заполнения'
  }
]);

validation.addField('#modal__input-name', [
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Имя слишком короткое',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Имя слишком длинное',
  },

  {
    rule: 'required',
    errorMessage: 'Поле обязательно для заполнения'
  }
]);

validation.addField('#modal__input-lastName', [
  {
    rule: 'minLength',
    value: 2,
    errorMessage: 'Отчество слишком короткое',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Отчество слишком длинное',
  }
]);

