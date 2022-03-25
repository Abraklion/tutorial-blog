/* ========================================= *
*           ===  ТОЧКА ВХОДА  ===            *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

import {HeaderComponent} from "./components/header.component"
import {NavigationComponent} from "./components/navigation.component"
import {CreateComponent} from "./components/create.component";
import {PostsComponent} from "./components/posts.component";
import {FavoriteComponent} from "./components/favorite.component";
import {LoaderComponent} from "./components/loader.component";
import './css/styles.css'

/* первый экран */
new HeaderComponent('header') // (Э)-> компонент #header

/* погрузчи */
const loader = new LoaderComponent('loader') // (Э)-> компонент #loader

/* посты */                                     // {loader} - запись ES6
const posts = new PostsComponent('posts', {loader: loader}) // (Э)-> компонент #posts
/* создать пост */
const create = new CreateComponent('create') // (Э)-> компонент #create
/* избранное */
const favorite = new FavoriteComponent('favorite', {loader: loader}) // (Э)-> компонент #favorite

/* табы */
const navigation = new NavigationComponent('navigation') // (Э)-> компонент #navigation

navigation.registerTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favorite', component: favorite}
]) // [П]-> прокидываем экземпляры компонентов [ #posts #create #favorite ] в метод компонента #navigation


