<template>
  <div>
    <HeaderBack title="Create Jobs" link="/jobs" />
    <div class="tw-my-8">
      <FormJob actionButton="Create" @create-update="createJob" />
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
    }
  },
  methods: {
    async createJob(form) {
      const status = await this.JobService.createJob(form)
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
      }
    },
  },
}
</script>
