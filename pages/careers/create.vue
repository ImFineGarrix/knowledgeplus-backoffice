<template>
  <div>
    <HeaderBack title="Create Careers" link="/careers" />
    <div class="tw-my-8">
      <FormCareer actionButton="Create" @create-update="createCareer" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import CareerProvider from '@/resources/CareerProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      CareerService: new CareerProvider(),
      loading: false,
    }
  },
  methods: {
    async createCareer(form) {
      this.loading = true
      const formCareer = {
        ...form,
        sections: form.sections.map((sec) => ({
          sectionId: sec,
        })),
        skills: form.skills.map((skill) => ({
          skillId: skill,
        })),
      }
      const status = await this.CareerService.createCareer(formCareer)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Create Career Success',
        }).then(() => {
          this.$router.push('/careers')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Create Career Fail',
        })
        this.loading = false
      }
      this.loading = false
    },
  },
}
</script>
