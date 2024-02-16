<template>
  <div>
    <HeaderBack title="Edit Career Group Group" link="/groups" />
    <div class="tw-my-8">
      <FormGroup
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateGroup" />
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
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateGroup (form) {
      this.loading = true
      const formGroup = {
        ...form,
        sections: form.sections.map((sec) => ({sectionId: sec}))
      }

      const status = await this.GroupService.updateGroup(this.idParams, formGroup)
      if (status.message === 'success') {
        Swal.fire({
          title: 'Update Career Group Success',
          icon: 'success',
        }).then(() => {
          this.$router.push('/groups')
        })
      } else {
        Swal.fire({
          title: `Update Career Group Fail`,
          icon: 'error',
        })
        this.loading = false
      }
      this.loading = false
    }
  }
};
</script>
