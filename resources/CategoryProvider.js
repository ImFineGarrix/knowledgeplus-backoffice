import HttpRequest from './HttpRequest'

class CategoryProvider extends HttpRequest {

  async getCategory() {
    try {
      const data = await this.get(`/categories`)
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

  async getCategoryById(id) {
    try {
      const data = await this.get(`/categories/${id}`)
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

  async createCategory(body) {
    try {
      await this.post('/categories', body)
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

  async updateCategory(id, body) {
    try {
      await this.put(`/categories/${id}`, body)
      return {
        message: 'success',
        status: 200
      }
    } catch (e) {
      return {
        message: 'error',
        status: e.statusCode,
      }
    }
  }

  async deleteCategory(id) {
    try {
      await this.delete('/categories', id)
      return {
        message: 'success',
        status: 200
      }
    } catch (e) {
      return {
        message: 'error',
        status: e.statusCode,
        msgError: messageError[e.statusCode]
      }
    }
  }

}

export default CategoryProvider
