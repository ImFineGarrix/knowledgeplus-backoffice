<template>
  <div>
    <HeaderBack title="Create Course" link="/courses" />
    <div class="tw-my-8">
      <FormCourse actionButton="Create" @create-update="createCourse" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import CourseProvider from '~/resources/CourseProvider'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      CourseService: new CourseProvider(),
      loading: false
    }
  },
  methods: {
    async createCourse (form) {
      this.loading = true
      const formCourse = {
        ...form,
      }

      const status = await this.CourseService.createCourse(formCourse)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Create Course Success',
        }).then(() => {
          this.$router.push('/courses')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Create Course Fail',
          text: `${status.code}: ${status.message}`
        })
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>
