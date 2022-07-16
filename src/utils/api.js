const dataUrl = 'https://norma.nomoreparties.space/api'
/**
 *
 * @param {string} Раздел API, например 'ingredients'
 * @returns
 */
export function getFromApi(str) {
  const url = str ? `${dataUrl}/${str}` : dataUrl
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
  return fetch(dataUrl + '/orders', {
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

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
