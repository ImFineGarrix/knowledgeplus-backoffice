import { getAuthDecode } from '~/utils/Auth'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const data = getAuthDecode()
    const pathLogin = '/login'
    if (to.path !== '/login' && (data && data.exp * 1000 < new Date().getTime() || data === null)) {
      return navigateTo(pathLogin)
    }
  }
})
