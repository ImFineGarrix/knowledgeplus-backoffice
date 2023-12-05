<template>
  <div>
    <HeaderBack title="Create Jobs" link="/jobs" />
    <div class="tw-my-8">
      <FormJob actionButton="Create" @create-update="createJob" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import JobProvider from '@/resources/JobProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      JobService: new JobProvider(),
      loading: false,
    }
  },
  methods: {
    async createJob(form) {
      this.loading = true
      const formJob = {
        ...form,
        categories: form.categories.map((category) => ({
          categoryId: category,
        })),
        skills: form.skills.map((skill) => ({
          skillId: skill,
        })),
      }
      const status = await this.JobService.createJob(formJob)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Create Job Success',
        }).then(() => {
          this.$router.push('/jobs')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Create Job Fail',
          text: `${status.status}`,
        })
        this.loading = false
      }
    },
  },
}
</script>
