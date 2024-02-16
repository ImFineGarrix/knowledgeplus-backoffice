<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field
        label="ชื่อกลุ่ม"
        variant="outlined"
        v-model.trim="form.name"
        :rules="[rules.ruleRequired]"></v-text-field>
      <v-autocomplete
        chips
        multiple
        clearable
        v-model="form.sections"
        label="สายงาน"
        :rules="[rules.ruleArray]"
        :items="sections"
        item-title="name"
        item-value="sectionId"
        variant="outlined"></v-autocomplete>
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
import { useFormRules } from '~/composables/rules'
import GroupProvider from '~/resources/GroupProvider'
import SectionProvider from '~/resources/SectionProvider'

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
      GroupService: new GroupProvider(),
      SectionService: new SectionProvider(),
      rules: useFormRules(),
      form: {
        name: '',
        sections: [],
      },
      sections: []
    }
  },
  mounted () {
    if (this.idParams) {
      this.getGroupById(this.idParams)
    }
    this.getSection()
  },
  methods: {
    async getSection () {
      const { data } = await this.SectionService.getSection()
      this.sections = JSON.parse(JSON.stringify(data))
    },
    async getGroupById (id) {
      const { data } = await this.GroupService.getGroupById(id)
      this.form = {
        ...data,
        sections: data.sections.map((section) => section.sectionId)
      }
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.$emit('create-update', this.form)
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
