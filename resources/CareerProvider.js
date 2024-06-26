import HttpRequest from './HttpRequest'

class CareerProvider extends HttpRequest {

  async getCareer(page, limit) {
    try {
      const data = await this.get(`/careers?page=${page}&limit=${limit}`)
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

  async getCareerById(id) {
    try {
      const data = await this.get(`/careers/${id}`)
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

  async createCareer(body) {
    try {
      await this.post('/careers', body)
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

  async updateCareer(id, body) {
    try {
      await this.put(`/careers/${id}`, body)
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

  async deleteCareer(id) {
    try {
      await this.delete(`/careers/${id}`)
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

export default CareerProvider
