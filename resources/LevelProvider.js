import HttpRequest from './HttpRequest'

class LevelProvider extends HttpRequest {

  async getLevel() {
    try {
      const data = await this.get(`/levels`)
      return {
        message: 'success',
        status: 200,
        data
      }
    } catch (e) {
      return {
        e
      }
    }
  }
}

export default LevelProvider
