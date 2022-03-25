/* ========================================= *
*    ===     БАЗОВЫЙ КЛАСС ФОРМ     ===      *
* ========================================= */

// [С]-> Статический метод
// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публийный метод
// [ПФ]-> Приватная функция
// [ПH]-> Публийный-наследуемый метод
// (Э)-> Экземпляр класса
// {P}-> Доступ до конструктора, свойств и методов родительсконо класса

export class Form {

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(form, controls) {

    this.form = form // форма

    this.controls = controls // поля формы

  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Вытавкивает значения из полей формы <
  value() {
    const value = {}

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    })

    return value
  }

  // > Проверка на валидацию <
  isValid() {

    let isFormValid = true // Флаг

    Object.keys(this.controls).forEach(control => {

      const validators = this.controls[control] // массив с валидаторами

      let isValid = true // Флаг

      validators.forEach(validator =>{

        isValid = validator(this.form[control].value) && isValid // [С]-> запускаем валидаторы по цепочки

      })

                // если элемент формы невалиден
      isValid ? clearError(this.form[control]) : setError(this.form[control])
                                                 // если элемент формы валиден

      isFormValid = isFormValid && isValid // переключаем Флаг

    })

    return isFormValid // возврашаем результат
  }

  // > Очищаем форму <
  clear() {

    this.form.reset()

  }

}

/* ===========================
*     Приватные функции      *
=========================== */

// > Сформировать и отправить ошибку <
function setError($control){

  clearError($control) // [ПФ]-> удаляет сообщения об ошибки

  const error = '<p class="validation-error">Введите корректное значение</p>' // формируем сообшения об ошибки

  $control.classList.add('invalid') // подсветить не валидный элемент красным цветом

  $control.insertAdjacentHTML('afterend', error) // добавляем сообщения от ошибки после невалидного элемента
}

// > Удалить сообщения об ошибки <
function clearError($control){

  $control.classList.remove('invalid') // удалить подсветку

  // элемент с ошибкой сушествует
  if($control.nextElementSibling){

    $control.closest('.form-control').removeChild($control.nextElementSibling) // удаляет ошибку

  }

}
