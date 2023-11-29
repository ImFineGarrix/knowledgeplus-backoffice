<template>
  <div>
    <HeaderBack title="Edit Skill" link="/skills" />
    <div class="tw-my-8">
      <FormSkill
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateSkill" />
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import SkillProvider from '~/resources/SkillProvider'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
    }
  },
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateSkill(form) {
      const status = await this.SkillService.updateSkill(this.idParams, form)
      if (status.message === 'success') {
        Swal.fire({
          title: 'Update Skill Success',
          icon: 'success',
        }).then(() => {
          this.$router.push('/skills')
        })
      } else {
        Swal.fire({
          title: `Update Skill Fail`,
          text: `${status.status}`,
          icon: 'error',
        })
      }
    },
  },
}
</script>
