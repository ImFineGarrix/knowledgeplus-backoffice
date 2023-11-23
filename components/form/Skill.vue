<template>
  <div>
    <div class="tw-space-y-2">
      <v-text-field
        v-model.trim="form.name"
        label="ชื่อทักษะ"
        variant="outlined" />
      <div class="tw-pb-4">
        <div v-if="checkImage()">
          <label for="upload-image" class="tw-cursor-pointer">
            <div
              class="tw-w-full tw-h-40 tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-dotted tw-border-black tw-bg-[#F4F4F4] tw-font-semibold tw-text-[#626262]">
              อัปโหลดไอคอนทักษะ
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
      <v-autocomplete
        chips
        mulitple
        :items="skillLevel"
        item-title="label"
        item-value="value"
        v-model="form.level"
        label="ระดับทักษะ"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        v-model="form.jobs"
        label="อาชีพ"
        variant="outlined" />
      <v-textarea v-model="form.desc" label="คำอธิบาย" variant="outlined" />

      <div class="tw-flex tw-justify-end">
        <div
          class="tw-bg-[#51b462] tw-px-8 tw-py-2 tw-text-white tw-rounded-md tw-cursor-pointer">
          {{ actionButton }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      form: {
        name: '',
        level: [],
        jobs: [],
        desc: '',
        image: null,
      },
      skillLevel: [
        {
          label: 'Basic',
          value: 'basic',
        },
        {
          label: 'Advance',
          value: 'advence',
        },
      ],
      previewImage: null,
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
      const urlImage = await this.uploadFile(this.form.image, this.form.value)
      console.log(urlImage)
    },
    async uploadFile(file, name) {
      if (!file) {
        return ''
      }

      const typeFile = typeof file
      if (typeFile === 'string') {
        return file
      }

      return await FirebaseService.uploadFile(`skill/${name}`, file)
    },
  },
}
</script>
