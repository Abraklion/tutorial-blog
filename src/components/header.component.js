/* ========================================= *
*        ===  КОМПОНЕНТ #HEADER  ===         *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

import {Component} from "../core/component"

export class HeaderComponent extends Component {

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(id) {

    super(id) // {P}-> вызываем конструктор родителя

  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Интерфейс компонента <
  init() {

    // если в localStorage в переменой visited что то есть
    if (localStorage.getItem('visited')) {

      this.hide() // [ПН]-> скрывает компонент

    }else{

      const button = this.$el.querySelector('.js-header-start')

      // вешаем события клика на кнопку "Приступить"
      button.addEventListener('click',buttonHandler.bind(this))

      this.$el.nextElementSibling.classList.add('hide') // скрываем весь контент кроме первого экрана

    }

  }

}

/* ===========================
*     Приватные функции      *
=========================== */

// > обработчик для кнопки <
function buttonHandler() {

  localStorage.setItem('visited', JSON.stringify(true)) // записываем в локальное хранилище

  this.hide() // [ПН]-> скрывает компонент

  this.$el.nextElementSibling.classList.remove('hide') // показываем весь контент кроме первого экрана
}
