/* ============================================================ *
*   ===  ШАБЛОН (Создает HTML верстку одного поста)  ===        *
* ============================================================ */

export function renderPost(post, options = {}) {

  // русификация news и note на зовость и заметка
  const tag = post.type === 'news'
    ? '<li class="tag tag-blue tag-rounded">Новость</li>'
    : '<li class="tag tag-rounded">Заметка</li>'

  const favorites = JSON.parse(localStorage.getItem('favorites')) || []  // обращаемся к хранилищю

  const condidate = favorites.find(p => p.id === post.id)  // проверяем есть ли в хранилище id

  // создания кнопки
  const button = condidate
    ? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить</button>`
    : `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`

  // Шаблон
  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${options.withButton ? button : ''}
      </div>
    </div>
  `
}
