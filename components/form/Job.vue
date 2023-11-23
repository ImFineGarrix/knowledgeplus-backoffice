<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field
        v-model.trim="form.name"
        :rules="[required]"
        label="ชื่ออาชีพ"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        v-model="form.category"
        :items="categories"
        item-title="label"
        item-value="categoryId"
        label="สายงาน"
        variant="outlined" />
      <v-textarea
        v-model="form.shortDesc"
        label="คำอธิบายสั้น"
        variant="outlined" />
      <v-textarea v-model="form.desc" label="คำอธิบาย" variant="outlined" />
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
      CategoryService: new CategoryProvider(),
      categories: [],
      form: {
        name: '',
        category: [],
        shortDesc: '',
        desc: '',
      },
      required: (v) => !!v || 'THIS FIELD IS REQUIRED',
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const data = await this.CategoryService.getCategory()
      this.categories = JSON.parse(JSON.stringify(data.data))
    },
    async setForm() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        const form = {
          ...this.form,
          category: this.form.category.map((cate) => ({
            categoryId: cate,
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
  },
}
</script>

<style lang="scss" scoped></style>
