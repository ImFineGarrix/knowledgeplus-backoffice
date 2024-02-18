import HttpRequest from './HttpRequest'

class SectionProvider extends HttpRequest {

  async getSection() {
    try {
      const data = await this.get(`/sections`)
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

  async getSectionById(id) {
    try {
      const data = await this.get(`/sections/${id}`)
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

  async createSection(body) {
    try {
      await this.post('/sections', body)
      return {
        message: 'success',
        status: 200,
      }
    } catch (e) {
      return {
        e
      }
    }
  }

  async updateSection(id, body) {
    try {
      await this.put(`/sections/${id}`, body)
      return {
        message: 'success',
        status: 200
      }
    } catch (e) {
      return {
        e
      }
    }
  }

  async deleteSection(id) {
    try {
      await this.delete(`/sections/${id}`)
      return {
        message: 'success',
        status: 200
      }
    } catch (e) {
      return {
        e
      }
    }
  }

}

export default SectionProvider
