/* ========================================= *
*      ===  КОМПОНЕНТ #NAVIGATION  ===       *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

import {Component} from "../core/component"

export class NavigationComponent extends Component {

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(id) {

    super(id) // {P}-> вызываем конструктор родителя

    this.tabs = [] // масив с табами
  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Интерфейс компонента <
  init() {

    // вешаем события клика на компонент
    this.$el.addEventListener('click', tabClickHandler.bind(this))

  }

  // > Регистрация табов <
  registerTabs(tabs){

    this.tabs = tabs

  }
}

/* ===========================
*     Приватные функции      *
=========================== */

// > обработчик щелчка по табу <
function tabClickHandler(event) {

  event.preventDefault()

  // через делегирования: если элемент по которому произошел клик имеет класс tab
  if (event.target.classList.contains('tab')){

    // Удаляем у всех элементов с классом tab класс active
    Array.from(this.$el.querySelectorAll('.tab'))
      .forEach(tab => tab.classList.remove('active'))

    // добавляем класс active целевому элементу с класом tab
    event.target.classList.add('active')

    // определяем активный tab элемент
    const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)

    // скрываем все таб элементы
    this.tabs.forEach(t => t.component.hide())

    // показываем активный tab элемент
    activeTab.component.show()
  }

}
