<template>
  <div>
    <HeaderBack title="Edit Jobs" link="/jobs" />
    <div class="tw-my-8">
      <FormJob
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateJob" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import JobProvider from '~/resources/JobProvider'
export default {
  data() {
    return {
      JobService: new JobProvider(),
      load: false,
    }
  },
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateJob(form) {
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
      const status = await this.JobService.updateJob(this.idParams, formJob)
      if (status.message === 'success') {
        Swal.fire({
          title: 'Update Job Success',
          icon: 'success',
        }).then(() => {
          this.$router.push('/jobs')
        })
      } else {
        Swal.fire({
          title: `Update Job Fail`,
          text: `${status.status}`,
          icon: 'error',
        })
        this.loading = false
      }
    },
  },
}
</script>
