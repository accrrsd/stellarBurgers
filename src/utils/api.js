const dataUrl = 'https://norma.nomoreparties.space/api'
/**
 *
 * @param {string} Раздел API, например 'ingredients'
 * @returns
 */
export function getFromApi(str) {
  const url = str ? `${dataUrl}/${str}` : dataUrl
  return fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((result) => result.data)
    .catch((err) => console.log(err))
}
/**
 *
 * @param {array} Массив _id ингредиентов
 * @returns
 */
export function postOrder(ArrayOfId) {
  return fetch(dataUrl + '/orders', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ingredients: ArrayOfId,
    }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((result) => result)
    .catch((err) => console.log(err))
}
