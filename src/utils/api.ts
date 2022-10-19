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
export function getFromApi(str: string) {
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
export function postOrder(arrayOfId: string[]) {
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

export type TResetBody = {
  password: string
  token: string
}

export function resetPassword(content: TResetBody) {
  return fetch(dataUrls.resetPassword, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

type TProfileManagerBody =
  | TProfileLoginBody
  | TProfileForgotBody
  | TProfileRegisterBody
  | TProfileLogoutBody

export type TProfileLoginBody = {
  email: string
  password: string
}

export type TProfileForgotBody = {
  email: string
}

export type TProfileRegisterBody = {
  email: string
  password: string
  name: string
}

export type TProfileLogoutBody = {
  token: string
}

export function profileManager(content: TProfileManagerBody, actionString: keyof typeof dataUrls) {
  return fetch(dataUrls[actionString], {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

export type TRefreshBody = TProfileLogoutBody

export function refreshToken(content: TRefreshBody) {
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

export type TPatchUserBody = {
  name: string
  email: string
  password: string
}

export function patchUser(content: TPatchUserBody) {
  return fetch(dataUrls.userUpdate, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('access'),
    },
    method: 'PATCH',
    body: JSON.stringify(content),
  }).then(checkResponse)
}

const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
