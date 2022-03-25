/* ========================================= *
*       ===  КОМПОНЕНТ #FAVORITE  ===        *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// [ПФ]-> Приватная функция
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

import {Component} from "../core/component"
import {apiService} from "../services/api.service"
import {renderPost} from "../templates/post.template"

export class FavoriteComponent extends Component {

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(id,options) {

    super(id) // {P}-> вызываем конструктор родителя

    this.loader = options.loader  // экземпляр класса loader

  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Интерфейс компонента <
  init() {

    this.$el.addEventListener('click', linkClickHandler.bind(this))

  }

  // > Действия после показа компонента <
  onShow() {

    const favorites = JSON.parse(localStorage.getItem('favorites')) // достаем из хранилища

    const html = renderList(favorites) // [ПФ]-> создает HTML верстку списка избранное

    this.$el.insertAdjacentHTML('afterbegin', html) // отрисовываем список избранного
  }

  // > Действия после скрытия компонента <
  onHide() {

    this.$el.innerHTML = ''

  }

}

/* ===========================
*     Приватные функции      *
=========================== */

// > Обработчик щелчка по сслыки <
async function linkClickHandler(event) {

  event.preventDefault()

  // если у элемента по которому произошел клик есть класс js-link
  if(event.target.classList.contains('js-link')){

    const postId = event.target.dataset.id // получаем id поста

    this.$el.innerHTML = '' // очищаем содержимое компонента

    this.loader.show() // [ПH]-> Показать компонент (подгрузчик)

    const post = await apiService.fetchPostById(postId)  // [П]-> json с одним постом

    this.loader.hide() // [ПH]-> Скрыть компонент (подгрузчик)

    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false})) // [Ш]-> отрисовываем список избранного

  }


}

// > Создает HTML верстку списка избранное <
function renderList(list = []) {
  if (list && list.length) {
    return `
      <ul>
        ${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`).join(' ')}
      </ul>
    `

    // return list.map(id => ``)
  }

  return `<p>Вы пока ничего не добавили</p>` // если list пустой
}
