<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field
        v-model.trim="form.name"
        :rules="[rules.ruleRequired, rules.ruleLength255]"
        label="ชื่ออาชีพ(ภาษาอังกฤษ)"
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
        label="groups"
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
import CategoryProvider from '@/resources/CategoryProvider';
import SkillProvider from '@/resources/SkillProvider';
import CareerProvider from '@/resources/CareerProvider';
import { useFormRules } from '@/composables/rules';

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
      CareerService: new CareerProvider(),
      SkillService: new SkillProvider(),
      CategoryService: new CategoryProvider(),
      categories: [],
      skills: [],
      form: {
        name: '',
        categories: [],
        skills: [],
        description: '',
      },
      rules: useFormRules(),
    };
  },
  mounted() {
    if (this.idParams) {
      this.getCareerById(this.idParams);
    }
    this.getCategories();
    this.getSkills();
  },
  methods: {
    async getCategories() {
      const { data } = await this.CategoryService.getCategory();
      this.categories = JSON.parse(JSON.stringify(data));
    },
    async getSkills() {
      const { data } = await this.SkillService.getSkill(1, 9999);
      this.skills = JSON.parse(JSON.stringify(data.skills));
    },
    async getCareerById(id) {
      const { data } = await this.CareerService.getCareerById(id);
      this.form = {
        ...data,
        skills: data.skills.map((skill) => skill.skillId),
        categories: data.categories.map((category) => category.categoryId),
      };
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$emit('create-update', this.form);
      } else {
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

<style lang="scss" scoped></style>
