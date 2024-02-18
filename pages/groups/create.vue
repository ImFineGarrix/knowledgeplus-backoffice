<template>
  <div>
    <HeaderBack title="Create Career Group" link="/groups" />
    <div class="tw-my-8">
      <FormGroup actionButton="Create" @create-update="createGroup" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import GroupProvider from '~/resources/GroupProvider'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      GroupService: new GroupProvider(),
      loading: false
    }
  },
  methods: {
    async createGroup (form) {
      this.loading = true
      const formGroup = {
        ...form,
        sections: form.sections.map((sec) => ({sectionId: sec}))
      }

      const status = await this.GroupService.createGroup(formGroup)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Create Career Group Success',
        }).then(() => {
          this.$router.push('/groups')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Create Career Group Fail',
          text: `${status.e.code}: ${status.e.message}`
        })
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>
