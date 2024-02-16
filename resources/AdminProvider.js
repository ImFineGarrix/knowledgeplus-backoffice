import HttpRequest from './HttpRequest'

class AdminProvider extends HttpRequest {

  async getAdmin(page, limit) {
    try {
      const data = await this.get(`/admins`)
      return {
        message: 'success',
        status: 200,
        data
      }
    } catch (e) {
      return {
        message: 'error',
        status: e,
      }
    }
  }

  async getAdminById(id) {
    try {
      const data = await this.get(`/admins/${id}`)
      return {
        message: 'success',
        status: 200,
        data
      }
    } catch (e) {
      return {
        message: 'error',
        status: e,
      }
    }
  }

  async createAdmin(body) {
    try {
      await this.post('/admins', body)
      return {
        message: 'success',
        status: 200,
      }
    } catch (e) {
      return {
        message: 'error',
        status: e,
      }
    }
  }

  async updateAdmin(id, body) {
    try {
      await this.put(`/admins/${id}`, body)
      return {
        message: 'success',
        status: 200
      }
    } catch (e) {
      return {
        message: 'error',
        status: e,
      }
    }
  }

  async deleteAdmin(id) {
    try {
      await this.delete(`/admins/${id}`)
      return {
        message: 'success',
        status: 200
      }
    } catch (e) {
      return {
        message: 'error',
        status: e,
      }
    }
  }

}

export default AdminProvider
