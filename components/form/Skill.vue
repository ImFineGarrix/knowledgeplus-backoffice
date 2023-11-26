<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
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
            accept=".svg"
            hidden
            @change="uploadImage($event)" />
        </div>
        <div v-else>
          <div
            class="tw-relative tw-w-full tw-h-64 tw-border tw-flex tw-justify-center tw-bg-[#cecece] tw-border-black hover-image">
            <div
              class="delete-image tw-absolute tw-text-rose-500 tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%] tw-bg-white tw-p-5 tw-rounded-full tw-shadow-xl tw-cursor-pointer">
              <IconDelete @click="removeImage()" />
            </div>
            <img :src="previewImage" />
          </div>
        </div>
      </div>
      <v-autocomplete
        clearable
        class="custom-autocomplete"
        :items="skillLevel"
        item-title="name"
        item-value="levelID"
        v-model="form.level"
        label="ระดับทักษะ"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        clearable
        color="white"
        color-hover="gray"
        v-model="form.jobs"
        :items="jobs"
        item-title="name"
        itme-value="careerId"
        label="อาชีพ"
        variant="outlined" />
      <v-textarea v-model="form.desc" label="คำอธิบาย" variant="outlined" />
      <div class="tw-flex tw-justify-end">
        <button
          @click="setForm()"
          class="tw-bg-[#79af82] hover:tw-bg-[#51b462] tw-transition-all tw-px-8 tw-py-2 tw-text-white tw-rounded-md">
          {{ actionButton }}
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
import LevelProvider from '~/resources/LevelProvider'
import JobProvider from '~/resources/JobProvider'
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
      JobService: new JobProvider(),
      LevelService: new LevelProvider(),
      form: {
        name: '',
        level: [],
        jobs: [],
        desc: '',
        image: null,
      },
      loading: false,
      required: (v) => !!v || 'THIS FIELD IS REQUIRED',
      skillLevel: [],
      jobs: [],
      previewImage: null,
    }
  },
  mounted() {
    this.getLevel()
    this.getJob()
  },
  methods: {
    async getLevel() {
      const data = await this.LevelService.getLevel()
      if (data.message === 'success') {
        this.skillLevel = JSON.parse(JSON.stringify(data.data))
      }
    },
    async getJob() {
      const data = await this.JobService.getJob()
      if (data.message === 'success') {
        this.jobs = JSON.parse(JSON.stringify(data.data))
      }
    },
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
      this.loading = true
      // const urlImage = await this.uploadFile(this.form.image, this.form.value)
      // console.log(urlImage)
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
