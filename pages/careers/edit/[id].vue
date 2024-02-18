<template>
  <div>
    <HeaderBack title="Edit Careers" link="/careers" />
    <div class="tw-my-8">
      <FormCareer
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateCareer" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import CareerProvider from '~/resources/CareerProvider'
export default {
  data() {
    return {
      CareerService: new CareerProvider(),
      loading: false,
    }
  },
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateCareer(form) {
      this.loading = true
      const formCareer = {
        ...form,
        groups: form.groups.map((group) => ({
          groupId: group,
        })),
      }
      const status = await this.CareerService.updateCareer(
        this.idParams,
        formCareer
      )
      if (status.message === 'success') {
        Swal.fire({
          title: 'Update Career Success',
          icon: 'success',
        }).then(() => {
          this.$router.push('/careers')
        })
      } else {
        Swal.fire({
          title: `Update Career Fail`,
          icon: 'error',
          text: `${status.e.code}: ${status.e.message}`
        })
        this.loading = false
      }
      this.loading = false
    },
  },
}
</script>
