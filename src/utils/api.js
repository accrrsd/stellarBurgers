import { getCookie } from './cookie'
const mainUrl = 'https://norma.nomoreparties.space/api'
const dataUrls = {
  userUpdate: mainUrl + '/auth/user',
  login: mainUrl + '/auth/login',
  register: mainUrl + '/auth/register',
  logout: mainUrl + '/auth/logout',
  refreshToken: mainUrl + '/auth/token',

  forgotPass: mainUrl + '/password-reset',
  resetPassword: mainUrl + '/password-reset/reset',
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
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'POST',
    body: JSON.stringify({
      ingredients: arrayOfId,
    }),
  }).then(checkResponse)
}

export function resetPassword(content) {
  return fetch(dataUrls.resetPassword, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

export function profileManager(content, actionString) {
  return fetch(dataUrls[actionString], {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

export function refreshToken(content) {
  return fetch(dataUrls.refreshToken, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'POST',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

export function getUser() {
  return fetch(dataUrls.userUpdate, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'GET',
  }).then(checkResponse)
}

export function patchUser(content) {
  return fetch(dataUrls.userUpdate, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'PATCH',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
