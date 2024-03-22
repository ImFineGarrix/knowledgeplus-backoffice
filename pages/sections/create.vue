<template>
  <div>
    <HeaderBack title="Create Section" link="/sections" />
    <div class="tw-my-8">
      <FormSection actionButton="Create" @create-update="createSection" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>

<script>
import SectionProvider from '~/resources/SectionProvider'
import FirebaseProvider from '~/resources/FirebaseProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      FirebaseService: new FirebaseProvider(),
      SectionService: new SectionProvider(),
      loading: false,
    }
  },
  methods: {
    async createSection(form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const formSection = {
          ...form,
          imageUrl: urlImage,
        }
        const status = await this.SectionService.createSection(formSection)
        if (status.message === 'success') {
          Swal.fire({
            title: 'Create Section Success',
            icon: 'success',
          }).then(() => {
            this.$router.push('/sections')
          })
        } else {
          Swal.fire({
            title: `Create Section Fail`,
            icon: 'error',
          })
          this.load = false
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

      return await this.FirebaseService.uploadFile(`sections/${name}`, file)
    },
  },
}
</script>
