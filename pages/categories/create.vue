<template>
  <div>
    <HeaderBack title="Create Category" link="/categories" />
    <div class="tw-my-8">
      <FormCategory actionButton="Create" @create-update="createCategory" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>

<script>
import CategoryProvider from '~/resources/CategoryProvider'
import FirebaseProvider from '~/resources/FirebaseProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      FirebaseService: new FirebaseProvider(),
      CategoryService: new CategoryProvider(),
      loading: false,
    }
  },
  methods: {
    async createCategory(form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const formCategory = {
          ...form,
          imageUrl: urlImage,
        }
        const status = await this.CategoryService.createCategory(formCategory)
        if (status.message === 'success') {
          Swal.fire({
            title: 'Create Category Success',
            icon: 'success',
          }).then(() => {
            this.$router.push('/categories')
          })
        } else {
          Swal.fire({
            title: `Create Category Fail`,
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

      return await this.FirebaseService.uploadFile(`category/${name}`, file)
    },
  },
}
</script>

<style lang="scss" scoped></style>
