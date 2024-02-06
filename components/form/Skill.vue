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
      <v-textarea
        v-model="form.description"
        label="คำอธิบาย Skill"
        variant="outlined" />
      <v-autocomplete
        clearable
        label="ประเภท"
        :items="typeSkill"
        item-title="label"
        item-value="val"
        :rules="[rules.ruleRequired]"
        variant="outlined" />
      <v-autocomplete
        clearable
        multiple
        chips
        :items="levelStore.level"
        item-title="name"
        item-value="levelId"
        v-model="form.levelId"
        label="ระดับทักษะ"
        :rules="[rules.ruleRequired]"
        variant="outlined" />
      <v-textarea
        v-model="form.knowledgeDesc"
        label="คำอธิบาย Knowledge"
        variant="outlined" />
      <v-textarea
        v-model="form.abilityDesc"
        label="คำอธิบาย Ability"
        variant="outlined" />
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
import LevelProvider from '~/resources/LevelProvider';
import SkillProvider from '~/resources/SkillProvider';
import { useRuntimeConfig } from 'nuxt/app';
import { useFormRules } from '~/composables/rules';
import { useLevelStore } from '~/stores/Levels';

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
        levelId: null,
        description: '',
        knowledgeDesc: '',
        abilityDesc: '',
        imageUrl: null,
      },
      rules: useFormRules(),
      levelStore: useLevelStore(),
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
    };
  },
  mounted() {
    if (this.idParams) {
      this.getSkillById(this.idParams);
    }
    if (!this.levelStore.level.length) {
      this.getLevel();
    }
  },
  methods: {
    async getLevel() {
      const { data } = await this.LevelService.getLevel();
      this.levelStore.setLevel(data);
    },
    async getSkillById(id) {
      const { data } = await this.SkillService.getSkillById(id);
      this.form = data;
    },
    uploadImage(e) {
      const file = e.target.files[0];
      this.form.imageUrl = file;
      this.previewImage = URL.createObjectURL(file);
    },
    checkImage() {
      return !this.previewImage && !this.form.imageUrl;
    },
    removeImage() {
      this.previewImage = null;
      this.form.imageUrl = null;
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate();
      if (valid && this.form.imageUrl) {
        this.$emit('create-update', this.form);
      } else {
        if (!this.form.imageUrl) {
          this.validImage = true;
        }
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    },
  },
};
</script>
