<template>
  <div>
    <HeaderBack title="Edit Category" link="/categories" />
    <div class="tw-my-8">
      <FormCategory
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateCategory" />
    </div>
    <div v-if="load" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import CategoryProvider from '~/resources/CategoryProvider'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      CategoryService: new CategoryProvider(),
      load: false,
    }
  },
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateCategory(form) {
      this.load = true
      const status = await this.CategoryService.updateCategory(
        this.idParams,
        form
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
          text: `${status.status}`,
          icon: 'error',
        })
        this.load = false
      }
    },
  },
}
</script>
