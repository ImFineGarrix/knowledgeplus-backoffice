<template>
  <div>
    <HeaderBack title="Edit Skill" link="/skills" />
    <div class="tw-my-8">
      <FormSkill
        actionButton="Save"
        :idParams="idParams"
        @create-update="updateSkill" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import SkillProvider from '~/resources/SkillProvider'
import FirebaseProvider from '~/resources/FirebaseProvider'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
      FirebaseService: new FirebaseProvider(),
      loading: false,
    }
  },
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
  methods: {
    async updateSkill(form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const formSkill = {
          ...form,
          skillsLevels: form.skillsLevels.map((skill) =>({
              ...skill,
              skillId: form.skillId
            })),
          imageUrl: urlImage,
        }
        const status = await this.SkillService.updateSkill(
          this.idParams,
          formSkill
        )
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
            text: `${status.e.code}: ${status.e.message}`,
            icon: 'error',
          })
          this.loading = false
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Image Fail',
        })
        this.loading = false
      }
      this.loading = false
    },
    async uploadFile(file, name) {
      if (!file) {
        return ''
      }

      const typeFile = typeof file
      if (typeFile === 'string') {
        return file
      }

      return await this.FirebaseService.uploadFile(`skill/${name}`, file)
    },
  },
}
</script>
