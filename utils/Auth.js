import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const storageKey = 'knowledge.auth'

const getAuth = () => {
  const auth = Cookies.get(storageKey)
  return auth
}

const getAuthDecode = () => {
  const auth = Cookies.get(storageKey)
  return auth ? jwtDecode(auth) : null
}

const setAuthUser = (token, expire) => {
  Cookies.set(storageKey, token, {
    expires: new Date(expire),
    sameSite: 'strict'
  })
  return getAuth()
}

const clearAuth = () => {
  Cookies.remove(storageKey)
}

const getAuthToken = () => {
  let token = {}
  if (Cookies.get(storageKey)) {
    token = {
      key: 'Authorization',
      value: `Bearer ${Cookies.get(storageKey)}`
    }
  }
  return token
}

export default {
  setAuthUser,
  getAuth,
  getAuthToken,
  clearAuth,
  getAuthDecode
}

export {
  setAuthUser,
  getAuth,
  getAuthToken,
  clearAuth,
  getAuthDecode
}
