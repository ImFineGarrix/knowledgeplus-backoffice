<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <v-text-field
        v-model.trim="form.name"
        label="ชื่อทักษะ(ภาษาอังกฤษ)"
        :rules="[rules.ruleRequired, rules.ruleLength255]"
        variant="outlined" />
      <div class="tw-pb-4 tw-space-y-2">
        <p class="text-lg tw-font-semibold">
          อัปโหลดไอคอนทักษะ (แนะนำเป็นไฟล์ SVG)<span
            class="tw-text-rose-600 tw-ml-2"
            >*</span
          >
        </p>
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
            <div class="tw-flex tw-items-center">
              <img
                class="tw-h-40 tw-w-auto"
                :src="
                  previewImage ||
                  `${config.public.firebaseBaseUrl}${form.imageUrl}`
                " />
            </div>
          </div>
        </div>
      </div>
      <div class="tw-space-y-2 tw-py-4">
        <p class="text-lg tw-font-semibold">คำอธิบาย</p>
        <Editor v-model="form.description" />
      </div>
      <v-autocomplete
        clearable
        label="ประเภท"
        v-model="form.type"
        :items="typeSkill"
        item-title="label"
        item-value="val"
        :rules="[rules.ruleRequired]"
        variant="outlined" />
      <div
        v-for="(skillLevel, indexSkillLevel) in form.skillsLevels"
        :key="`skill-level-${indexSkillLevel}`"
        class="tw-space-y-4">
        <v-autocomplete
          clearable
          v-model="skillLevel.levelId"
          :items="levelFollwByType"
          item-title="level"
          item-value="levelId"
          chips
          label="ระดับทักษะ"
          variant="outlined" />
        <div class="tw-space-y-2">
          <p class="text-lg tw-font-semibold">คำอธิบาย Knowledge</p>
          <Editor v-model="skillLevel.knowledgeDesc" />
        </div>
        <div class="tw-space-y-2">
          <p class="text-lg tw-font-semibold">คำอธิบาย Ability</p>
          <Editor v-model="skillLevel.abilityDesc" />
        </div>
        <div
          v-if="form.skillsLevels.length !== 1"
          @click="removeSkillLevelFollyByIndex(indexSkillLevel)"
          class="tw-cursor-pointer tw-flex tw-justify-end tw-pb-4">
          <div class="tw-bg-rose-600 tw-py-1 tw-px-5 tw-rounded-md">
            <v-icon color="white">mdi-minus</v-icon>
          </div>
        </div>
      </div>
      <div
        @click="addSkillLevel()"
        class="tw-cursor-pointer tw-flex tw-pb-4 tw-pt-2">
        <div class="tw-bg-emerald-600 tw-py-1 tw-px-5 tw-rounded-md">
          <v-icon color="white">mdi-plus</v-icon>
        </div>
      </div>
      <div class="tw-flex tw-justify-end">
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
import LevelProvider from '~/resources/LevelProvider'
import SkillProvider from '~/resources/SkillProvider'
import { useRuntimeConfig } from 'nuxt/app'
import { useLevelStore } from '~/stores/Levels'

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
      LevelService: new LevelProvider(),
      SkillService: new SkillProvider(),
      form: {
        name: '',
        description: '',
        imageUrl: null,
        type: null,
        skillsLevels: [{
          levelId: null,
          abilityDesc: '',
          knowledgeDesc: ''
        }]
      },
      rules: useFormRules(),
      LevelStore: useLevelStore(),
      previewImage: null,
      config: useRuntimeConfig(),
      validImage: false,
      typeSkill: [
        {
          label: 'Softskill',
          val: 'SOFT',
        },
        {
          label: 'Hardskill',
          val: 'HARD',
        },
      ],
    }
  },
  computed: {
    levelFollwByType () {
      if (this.form.type === 'SOFT') {
        return this.LevelStore.level.soft
      }
      return this.LevelStore.level.hard
    }
  },
  mounted() {
    if (this.idParams) {
      this.getSkillById(this.idParams)
    }
    if (!this.LevelStore.level.length) {
      this.getLevel()
    }
  },
  methods: {
    async getLevel() {
      const { data } = await this.LevelService.getLevel()
      this.LevelStore.setLevel(data)
    },
    async getSkillById(id) {
      const { data } = await this.SkillService.getSkillById(id)
      this.form = data
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
    addSkillLevel () {
      this.form.skillsLevels.push({
        levelId: null,
        abilityDesc: '',
        knowledgeDesc: ''
      })
    },
    removeSkillLevelFollyByIndex (index) {
      this.form.skillsLevels.splice(index, 1)
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
