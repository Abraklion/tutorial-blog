/* ========================================= *
*          ===  API СЕРВИСЫ  ===             *
* ========================================= */

// [С]-> Статический метод
// [Ч]-> Частный метод
// [П]-> Публичный метод
// [ПH]-> Публичный-наследуемый метод
// [ПФ]-> Приватная функция
// (Э)-> Экземпляр класса
// {P}-> Вызываем конструктор, свойство или метод родительского класса

/* Паттерн Singleton */

class ApiService{

  /* ===========================
   *        Конструктор        *
   =========================== */

  constructor(baseUrl) {

    this.url = baseUrl

  }

  /* ===========================
   *      Публичные методы     *
   =========================== */

  // > Создать новый пост <
  async createPost(post) {

    try{

      const request = new Request(this.url + '/posts.json',{
        method: 'post',
        body: JSON.stringify(post)
      })

      return useRequest(request) // [ПФ]-> запрос на сервер

    } catch (error){

      console.error(error)

    }

  }

  // > Вывести все посты  <
  async fetchPosts(){

    try {

      const request = new Request(`${this.url}/posts.json`,{
        method: 'get'
      })

      return useRequest(request) // [ПФ]-> запрос на сервер

    } catch (error) {

      console.error('error')

    }
  }

  // > Вывести один пост по id <
  async fetchPostById(id){

    try {

      const request = new Request(`${this.url}/posts/${id}.json`,{
        method: 'get'
      })

      return useRequest(request) // [ПФ]-> запрос на сервер

    } catch (error) {

      console.error('error')

    }
  }

}

/* ===========================
*     Приватные функции      *
=========================== */

// > Сделать запрос на сервер <
async function useRequest(request) {

  const response = await fetch(request)

  return await response.json()

}

export const apiService = new ApiService('https://tutorialblog-89023-default-rtdb.europe-west1.firebasedatabase.app') // (Э)-> экземпляр класса ApiService
