import { getCookie } from './cookie'
const mainUrl = 'https://norma.nomoreparties.space/api'
const dataUrls = {
  userUpdate: mainUrl + '/auth/user',
  login: mainUrl + '/auth/login',
  register: mainUrl + '/auth/register',
  logout: mainUrl + '/auth/logout',
  refreshToken: mainUrl + '/auth/token',

  forgotPass: mainUrl + '/password-reset',
  resetPass: mainUrl + '/password-reset/reset',
}
/**
 *
 * @param {string} Раздел API, например 'ingredients'
 * @returns
 */
export function getFromApi(str) {
  const url = str ? `${mainUrl}/${str}` : mainUrl
  return fetch(url)
    .then(checkResponse)
    .then((result) => result.data)
}
/**
 *
 * @param {array} Массив _id ингредиентов
 * @returns
 */
export function postOrder(arrayOfId) {
  return fetch(mainUrl + '/orders', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ingredients: arrayOfId,
    }),
  })
    .then(checkResponse)
    .then((result) => result)
}

export function profileManager(content, actionString, ready) {
  return fetch(dataUrls[actionString], {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: ready ? content : JSON.stringify(content),
  })
    .then(checkResponse)
    .then((result) => result)
}

export function refreshToken(content) {
  console.log(JSON.stringify(content))
  console.log(getCookie('access'))
  return fetch(dataUrls.refreshToken, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'POST',
    body: JSON.stringify(content),
  })
    .then(checkResponse)
    .then((result) => result)
}

export function getUser() {
  return fetch(dataUrls.userUpdate, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'GET',
  })
    .then(checkResponse)
    .then((result) => result)
}

export function patchUser(content) {
  return fetch(dataUrls.userUpdate, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'PATCH',
    body: JSON.stringify(content),
  })
    .then(checkResponse)
    .then((result) => result)
}

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
