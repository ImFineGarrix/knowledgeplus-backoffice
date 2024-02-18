<template>
  <div>
    <HeaderBack title="Create Skill" link="/skills" />
    <div class="tw-my-8">
      <FormSkill actionButton="Create" @create-update="createSkill" />
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import SkillProvider from '~/resources/SkillProvider'
import FirebaseProvider from '~/resources/FirebaseProvider'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      FirebaseService: new FirebaseProvider(),
      SkillService: new SkillProvider(),
      loading: false,
    }
  },
  methods: {
    async createSkill(form) {
      this.loading = true
      const urlImage = await this.uploadFile(form.imageUrl, form.name)
      if (urlImage !== 'error') {
        const formSkill = {
          ...form,
          imageUrl: urlImage,
        }
        const status = await this.SkillService.createSkill(formSkill)
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
            text: `${status.code}: ${status.message}`
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
