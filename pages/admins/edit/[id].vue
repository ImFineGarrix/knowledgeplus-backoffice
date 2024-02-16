<template>
  <div>
    <HeaderBack title="Edit Admin" link="/admins" />
    <div class="tw-my-8">
      <FormAdmin
        action-button="Save"
        :idParams="idParams"
        @create-update="updateAdmin" />
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
  computed: {
    idParams() {
      return this.$route.params.id || ''
    }
  },
  methods: {
    async updateAdmin (form) {
      this.loading = true
      const formAdmin = form

      const status = await this.AdminService.updateAdmin(this.idParams ,formAdmin)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Update Admin Success',
        }).then(() => {
          this.$router.push('/admins')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Admin Fail',
        })
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>
