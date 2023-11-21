<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field
        v-model.trim="form.label"
        label="ชื่อสายงาน (ใช้สำหรับแสดงบนเว็บ)"
        :rules="[required]"
        variant="outlined"></v-text-field>
      <v-text-field
        v-model.trim="form.value"
        label="ชื่อสายงาน (ใช้สำหรับในระบบ ห้ามเว้นวรรค)"
        :rules="[required]"
        variant="outlined"></v-text-field>
      <div>
        <div v-if="checkImage()">
          <label for="upload-image" class="tw-cursor-pointer">
            <div
              class="tw-w-full tw-h-40 tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-dotted tw-border-black tw-bg-[#F4F4F4] tw-font-semibold tw-text-[#626262]">
              อัปโหลดรูปภาพ
            </div>
          </label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            hidden
            @change="uploadImage($event)" />
        </div>
        <div v-else>
          <div
            class="tw-relative tw-w-full tw-h-64 tw-border tw-flex tw-justify-center tw-border-black hover-image">
            <div
              class="delete-image tw-absolute tw-text-rose-500 tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%] tw-bg-white tw-p-5 tw-rounded-full tw-shadow-xl tw-cursor-pointer">
              <IconDelete @click="removeImage()" />
            </div>
            <img :src="previewImage" />
          </div>
        </div>
      </div>
      <div class="tw-flex tw-justify-end tw-pt-4">
        <div
          @click="setForm()"
          class="tw-bg-[#51b462] tw-px-8 tw-py-2 tw-text-white tw-rounded-md tw-cursor-pointer">
          {{ actionButton }}
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import FirebaseProvider from '~/resources/FirebaseProvider'

export default {
  props: {
    idParams: {
      type: String,
      default: () => '',
    },
    actionButton: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      FirebaseService: new FirebaseProvider(),
      form: {
        label: '',
        value: '',
        image: null,
      },
      previewImage: null,
      required: (v) => !!v || 'THIS FIELD IS REQUIRED',
    }
  },
  methods: {
    uploadImage(e) {
      const file = e.target.files[0]
      this.form.image = file
      this.previewImage = URL.createObjectURL(file)
    },
    checkImage() {
      return !this.previewImage && !this.form.image
    },
    removeImage() {
      this.previewImage = null
      this.form.image = null
    },
    async setForm() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        const urlImage = await this.uploadFile(this.form.image, this.form.name)
        const form = {
          ...this.form,
          imageUrl: urlImage,
        }
        this.$emit('create-update', form)
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
    },
    async uploadFile(file, name) {
      if (!file) {
        return ''
      }

      const typeFile = typeof file
      if (typeFile === 'string') {
        return file
      }

      return await this.FirebaseService.uploadFile(`category/${name}`, file)
    },
  },
}
</script>

<style lang="scss" scoped></style>
