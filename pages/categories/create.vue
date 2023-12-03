<template>
  <div>
    <HeaderBack title="Create Category" link="/categories" />
    <div class="tw-my-8">
      <FormCategory actionButton="Create" @create-update="createCategory" />
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
  methods: {
    async createCategory(form) {
      this.load = true
      const status = await this.CategoryService.createCategory(form)
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
          text: `${status.status}`,
          icon: 'error',
        })
        this.load = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
