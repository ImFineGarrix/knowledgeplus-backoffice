<template>
  <div>
    <HeaderBack title="Create Admin" link="/admins" />
    <div class="tw-my-8">
      <FormAdmin action-button="Create" @create-update="createAdmin" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import AdminProvider from '~/resources/AdminProvider'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      AdminService: new AdminProvider(),
      loading: false
    }
  },
  methods: {
    async createAdmin (form) {
      this.loading = true
      const formAdmin = form

      const status = await this.AdminService.createAdmin(formAdmin)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Create Admin Success',
        }).then(() => {
          this.$router.push('/admins')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Create Admin Fail',
          text: `${status.e.code}: ${status.e.message}`
        })
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>
