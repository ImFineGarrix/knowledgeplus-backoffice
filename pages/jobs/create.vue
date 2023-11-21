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

const JobService = new JobProvider()

export default {
  methods: {
    async createJob(form) {
      const status = await JobService.createJob(form)
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
          text: `${status.status} - ${status.message}`,
        })
      }
    },
  },
}
</script>
