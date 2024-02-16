import HttpRequest from './HttpRequest'

class AuthProvider extends HttpRequest {
  async login(body) {
    try {
      const data = await this.post('/auth/login', body)
      return {
        message: 'success',
        status: 200,
        data
      }
    } catch (e) {
      return {
        message: 'error',
        status: e
      }
    }
  }
}

export default AuthProvider
