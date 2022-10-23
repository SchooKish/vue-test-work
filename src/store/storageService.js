export function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLocalStorage(key) {
  let data = localStorage.getItem(key)
  return JSON.parse(data)
}

export function cleanLocalStorage(key) {
  localStorage.removeItem(key)
}
