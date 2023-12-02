<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field
        v-model.trim="form.name"
        :rules="[rules.ruleRequired]"
        label="ชื่ออาชีพ"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        clearable
        v-model="form.categories"
        :rules="[rules.ruleArray]"
        :items="categories"
        item-title="name"
        item-value="categoryId"
        label="สายงาน"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        clearable
        v-model="form.skills"
        :items="skills"
        item-title="name"
        item-value="skillId"
        label="ทักษะ"
        variant="outlined" />
      <v-textarea
        v-model="form.shortDesc"
        label="คำอธิบายสั้น"
        variant="outlined" />
      <v-textarea
        v-model="form.description"
        label="คำอธิบาย"
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
import CategoryProvider from '@/resources/CategoryProvider'
import SkillProvider from '@/resources/SkillProvider'
import JobProvider from '@/resources/JobProvider'
import { useFormRules } from '@/composables/rules'

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
      SkillService: new SkillProvider(),
      CategoryService: new CategoryProvider(),
      categories: [],
      skills: [],
      form: {
        name: '',
        categories: [],
        skills: [],
        shortDesc: '',
        description: '',
      },
      rules: useFormRules(),
    }
  },
  mounted() {
    if (this.idParams) {
      this.getJobById(this.idParams)
    }
    this.getCategories()
    this.getSkills()
  },
  methods: {
    async getCategories() {
      const { data } = await this.CategoryService.getCategory()
      this.categories = JSON.parse(JSON.stringify(data))
    },
    async getSkills() {
      const { data } = await this.SkillService.getSkill(1, 9999)
      this.skills = JSON.parse(JSON.stringify(data.skills))
    },
    async getJobById(id) {
      const { data } = await this.JobService.getJobById(id)
      this.form = {
        ...data,
        skills: data.skills.map((skill) => skill.skillId),
        categories: data.categories.map((category) => category.categoryId),
      }
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        const form = {
          ...this.form,
          categories: this.form.categories.map((category) => ({
            categoryId: category,
          })),
          skills: this.form.skills.map((skill) => ({
            skillId: skill,
          })),
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
    requiredArray() {
      const tags = this.cleanTags(this.form.tags)
      if (!tags.length) {
        return 'THIS FIELD IS REQUIRED'
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped></style>
