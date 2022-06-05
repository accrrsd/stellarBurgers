const dataUrl = 'https://norma.nomoreparties.space/api'
/**
 *
 * @param {string} Раздел API, например 'ingredients'
 * @returns
 */
export default function getFromApi(str) {
  const url = str ? `${dataUrl}/${str}` : dataUrl
  return fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((result) => result.data)
    .catch((err) => console.log(err))
}
