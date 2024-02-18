import HttpRequest from './HttpRequest'

class CourseProvider extends HttpRequest {

  async getCourse(page, limit) {
    try {
      const data = await this.get(`/courses?page=${page}&limit=${limit}`)
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

  async getCourseById(id) {
    try {
      const data = await this.get(`/courses/${id}`)
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

  async createCourse(body) {
    try {
      await this.post('/courses', body)
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

  async updateCourse(id, body) {
    try {
      await this.put(`/courses/${id}`, body)
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

  async deleteCourse(id) {
    try {
      await this.delete(`/courses/${id}`)
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

export default CourseProvider
