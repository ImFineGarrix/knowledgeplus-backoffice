import HttpRequest from './HttpRequest'

class SkillProvider extends HttpRequest {

  async getSkill(page, limit) {
    try {
      const data = await this.get(`/skills?page=${page}&limit=${limit}`)
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

  async getSkillById(id) {
    try {
      const data = await this.get(`/skills/${id}`)
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

  async createSkill(body) {
    try {
      await this.post('/skills', body)
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

  async updateSkill(id, body) {
    try {
      await this.put(`/skills/${id}`, body)
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

  async deleteSkill(id) {
    try {
      await this.delete(`/skills/${id}`)
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

export default SkillProvider
