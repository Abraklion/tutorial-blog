/* ========================================= *
*        ===  КОМПОНЕНТ #CREATE  ===         *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

import {Component} from "../core/component"
import {Form} from "../core/form";
import {Validators} from "../core/validators";
import {apiService} from "../services/api.service";

export class CreateComponent extends Component {

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(id) {

    super(id); // {P}-> вызываем конструктор родителя

  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Интерфейс компонента <
  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))

    this.form = new Form(this.$el, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(10)],
    }) // (Э)-> экземпляр класса form

  }

}

/* ===========================
*     Приватные функции      *
=========================== */

// > обработчик отправки формы <
async function submitHandler(event) {

  event.preventDefault()

  if(this.form.isValid()){

    const formData = {

      type: this.$el.type.value, // значения select

      date: new Date().toLocaleDateString(),

      ...this.form.value() // [П]-> вытавкивает значения из полей формы

    }  // обьект всех полей формы и их значения

    await apiService.createPost(formData) // [П]-> создать новый пост

    this.form.clear() // [П]-> очищаем форму

    alert('Запись создана в базе данных')
  }

}
