<template>
  <div>
    <HeaderBack title="Edit Category" link="/categories" />
    <div class="tw-my-8">
      <FormCategory
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateCategory" />
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
      CategoryService: new CategoryProvider(),
      FirebaseService: new FirebaseProvider(),
      loading: false,
    }
  },
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateCategory(form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const formCategory = {
          ...form,
          imageUrl: urlImage,
        }
        const status = await this.CategoryService.updateCategory(
          this.idParams,
          formCategory
        )
        if (status.message === 'success') {
          Swal.fire({
            title: 'Update Category Success',
            icon: 'success',
          }).then(() => {
            this.$router.push('/categories')
          })
        } else {
          Swal.fire({
            title: `Update Category Fail`,
            icon: 'error',
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

      return await this.FirebaseService.uploadFile(`category/${name}`, file)
    },
  },
}
</script>
