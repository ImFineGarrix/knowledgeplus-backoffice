<template>
  <div>
    <HeaderBack title="Edit Organization" link="/organizations" />
    <div class="tw-my-8">
      <FormOrganization
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateOrganizartion" />
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
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateOrganizartion (form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const FormOrganization = {
          ...form,
          imageUrl: urlImage,
        }
        const status = await this.OrganizationService.updateOrganization(
          this.idParams,
          FormOrganization
        )
        if (status.message === 'success') {
          Swal.fire({
            title: 'Update Organization Success',
            icon: 'success',
          }).then(() => {
            this.$router.push('/organizations')
          })
        } else {
          Swal.fire({
            title: `Update Organization Fail`,
            icon: 'error',
            text: `${status.e.code}: ${status.e.message}`
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

      return await this.FirebaseService.uploadFile(`skill/${name}`, file)
    },
  }
}
</script>
