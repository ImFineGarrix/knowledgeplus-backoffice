<template>
  <div>
    <HeaderBack title="Create Skill" link="/skills" />
    <div class="tw-my-8">
      <FormSkill actionButton="Create" @create-update="createSkill" />
    </div>
  </div>
</template>
<script>
import SkillProvider from '~/resources/SkillProvider'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
    }
  },
  methods: {
    async createSkill(form) {
      const status = await this.SkillService.createSkill(form)
      if (status.message === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Create Skill Success',
        }).then(() => {
          this.$router.push('/skills')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Create Skill Fail',
          text: `${status.status} - ${status.message}`,
        })
      }
    },
  },
}
</script>
