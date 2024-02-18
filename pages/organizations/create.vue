<template>
  <div>
    <HeaderBack title="Create Organization" link="/organizations" />
    <div class="tw-my-8">
      <FormOrganization
        actionButton="Create"
        @create-update="createOrganization" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import OrganizationProvider from '~/resources/OrganizationProvider'
import FirebaseProvider from '~/resources/FirebaseProvider'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      OrganizationService: new OrganizationProvider(),
      FirebaseService: new FirebaseProvider(),
      loading: false
    }
  },
  methods: {
    async createOrganization (form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const formSkill = {
          ...form,
          imageUrl: urlImage
        }

        const status = await this.OrganizationService.createOrganization(formSkill)
        if (status.message === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Create Organization Success',
          }).then(() => {
            this.$router.push('/organizations')
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Create Organization Fail',
            text: `${status.code}: ${status.message}`
          })
          this.loading = false
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Image Fail',
        })
        this.loading = false
      }
      this.loading = false

    },
    async uploadFile(file, name) {
      if (!file) {
        return ''
      }

      const typeFile = typeof file
      if (typeFile === 'string') {
        return file
      }

      return await this.FirebaseService.uploadFile(`organization/${name}`, file)
    },
  }
}
</script>
