import HttpRequest from './HttpRequest'

class GroupProvider extends HttpRequest {

  async getGroup() {
    try {
      const data = await this.get(`/groups`)
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

  async getGroupById(id) {
    try {
      const data = await this.get(`/groups/${id}`)
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

  async createGroup(body) {
    try {
      await this.post('/groups', body)
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

  async updateGroup(id, body) {
    try {
      await this.put(`/groups/${id}`, body)
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

  async deleteGroup(id) {
    try {
      await this.delete(`/groups/${id}`)
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

export default GroupProvider
