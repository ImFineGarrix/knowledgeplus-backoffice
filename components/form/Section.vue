<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
          ชื่อสายงาน(ภาษาอังกฤษ)<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="ให้ผู้ใช้กรอกชื่อของสายงานใหญ่ที่ต้องการสร้างเพื่อแบ่งกลุ่มอาชีพให้ชัดเจน โดยกรอกเป็นภาษาอังกฤษ เช่น Information Technology, Art, Engineer">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>   
        </div>     
        <v-text-field
          v-model.trim="form.name"
          :rules="[rules.ruleRequired, rules.ruleLength255]"
          variant="outlined"></v-text-field>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
          อัปโหลดรูปภาพ<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="สามารถอัปโหลดไฟล์ภาพได้โดยการคลิกพื้นที่ภายในกรอบจุดไข่ปลา และกดเลือกไฟล์จากเครื่องของคุณ โดยกำหนดให้เป็นภาพที่เกี่ยวข้องกับสายงานที่คุณกรอกด้านบน เช่น ภาพจานสีแทนสายงาน Art">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <div v-if="checkImage()">
          <label for="upload-image" class="tw-cursor-pointer">
            <div
              :class="validImage ? 'tw-bg-rose-100 tw-border-rose-600' : ''"
              class="tw-w-full tw-h-40 tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-dotted tw-border-black tw-bg-[#F4F4F4] tw-font-semibold tw-text-[#626262]">
              <v-icon :color="validImage ? 'error' : ''" size="x-large"
                >mdi-image-filter-hdr</v-icon
              >
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
            <img
              :src="
                previewImage ||
                `${config.public.firebaseBaseUrl}${form.imageUrl}`
              " />
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
import SectionProvider from '~/resources/SectionProvider'
import { useRuntimeConfig } from 'nuxt/app'
import { useFormRules } from '~/composables/rules'

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
      SectionService: new SectionProvider(),
      form: {
        name: '',
        imageUrl: null,
      },
      previewImage: null,
      config: useRuntimeConfig(),
      rules: useFormRules(),
      validImage: false,
    }
  },
  mounted() {
    if (this.idParams) {
      this.getSectionById(this.idParams)
    }
  },
  methods: {
    async getSectionById(id) {
      const data = await this.SectionService.getSectionById(id)
      if (data.message === 'success') {
        this.form = data.data
      }
    },
    uploadImage(e) {
      const file = e.target.files[0]
      this.form.imageUrl = file
      this.previewImage = URL.createObjectURL(file)
    },
    checkImage() {
      return !this.previewImage && !this.form.imageUrl
    },
    removeImage() {
      this.previewImage = null
      this.form.imageUrl = null
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate()
      if (valid && this.form.imageUrl) {
        this.$emit('create-update', this.form)
      } else {
        if (!this.form.imageUrl) {
          this.validImage = true
        }
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>
