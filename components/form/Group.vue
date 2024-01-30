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
        v-model="form.groups"
        label="สายงาน"
        :rules="[rules.ruleArray]"
        variant="outlined"></v-autocomplete>
      <div class="tw-flex tw-justify-end tw-pt-4">
        <div
          class="tw-bg-[#51b462] tw-px-8 tw-py-2 tw-text-white tw-rounded-md tw-cursor-pointer">
          {{ actionButton }}
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
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
      rules: useFormRules(),
      form: {
        name: '',
        groups: [],
      },
    }
  },
  methods: {
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
