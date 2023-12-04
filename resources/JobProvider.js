import HttpRequest from './HttpRequest'

class JobProvider extends HttpRequest {

  async getJob(page, limit) {
    try {
      const data = await this.get(`/careers?page=${page}&limit=${limit}`)
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

  async getJobById(id) {
    try {
      const data = await this.get(`/careers/${id}`)
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

  async createJob(body) {
    try {
      await this.post('/careers', body)
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

  async updateJob(id, body) {
    try {
      await this.put(`/careers/${id}`, body)
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

  async deleteJob(id) {
    try {
      await this.delete(`/careers/${id}`)
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

export default JobProvider
