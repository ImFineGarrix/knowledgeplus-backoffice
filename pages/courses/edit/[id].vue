<template>
  <div>
    <HeaderBack title="Edit Course" link="/courses" />
    <div class="tw-my-8">
      <FormCourse
        actionButton="Save"
        @create-update="updateCourse"
        :idParams="idParams" />
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
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateCourse (form) {
      this.loading = true
      const formCourse = {
        ...form
      }

      const status = await this.CourseService.updateCourse(this.idParams, formCourse)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Update Course Success',
        }).then(() => {
          this.$router.push('/courses')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Course Fail',
          text: `${status.e.code}: ${status.e.message}`
        })
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>
