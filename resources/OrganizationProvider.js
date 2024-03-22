import HttpRequest from './HttpRequest'

class OrganizationProvider extends HttpRequest {

  async getOrganization() {
    try {
      const data = await this.get(`/organizations`)
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

  async getOrganizationById(id) {
    try {
      const data = await this.get(`/organizations/${id}`)
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

  async createOrganization(body) {
    try {
      await this.post('/organizations', body)
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

  async updateOrganization(id, body) {
    try {
      await this.put(`/organizations/${id}`, body)
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

  async deleteOrganization(id) {
    try {
      await this.delete(`/organizations/${id}`)
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

export default OrganizationProvider
