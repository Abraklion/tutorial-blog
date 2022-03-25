/* ========================================= *
*         ===  КОМПОНЕНТ #POSTS  ===         *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// [ПФ]-> Приватная функция
// [Ш]-> Шаблон
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

import {Component} from "../core/component"
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(id,{loader}) {

    super(id) // {P}-> вызываем конструктор родителя

    this.loader = loader // экземпляр класса loader
  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Интерфейс компонента <
  init() {

    this.$el.addEventListener('click', buttonHandler.bind(this))
  }

  // > Действия после показа компонента <
  async onShow() {

    this.loader.show() // [ПH]-> Показать компонент (подгрузчик)

    const fbData = await apiService.fetchPosts() // [П]-> Json со всеми постами

    const posts = TransformService.fbObjectToArray(fbData) // [С]-> трансформирует данные из Обьекта в Массив

    const html = posts.map(post => renderPost(post, {withButton: true})) // [Ш]-> создает HTML верстку

    this.loader.hide() // [ПH]-> Скрыть компонент (подгрузчик)

    this.$el.insertAdjacentHTML('afterbegin', html.join(' ')) // выводим посты в компоненте

  }

  // > Действия после скрытия компонента <
  onHide() {

    this.$el.innerHTML = ''

  }

}

/* ===========================
*     Приватные функции      *
=========================== */

// > Сохраняет посты в избранное или удаляет <
function buttonHandler(event) {

  const $el =event.target // элемент по которому крикнули

  const id = $el.dataset.id // id 

  const title = $el.dataset.title // title

  if(id) {

    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    let condidate = favorites.find(p => p.id === id) // проверяет есть ли в хранилище id

    if(condidate) {
      // удалить элемент

      $el.innerText = 'Сохранить'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')

      favorites = favorites.filter(p => p.id !== id) // фильтруем массив и удаляем элемент

    } else {
      // добавить элемент

      $el.innerText = 'Удалить'
      $el.classList.remove('button-primary')
      $el.classList.add('button-danger')

      favorites.push({id,title})

    }

    localStorage.setItem('favorites', JSON.stringify(favorites)) // обновляем переменую в хранилище
  }

}

