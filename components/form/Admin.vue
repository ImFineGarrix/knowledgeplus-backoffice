<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <v-text-field
        v-model="form.name"
        :rules="[rules.ruleRequired]"
        variant="outlined"
        label="ชื่อ"></v-text-field>
      <v-text-field
        v-model="form.email"
        :rules="[rules.ruleRequired, rules.ruleEmail, rules.ruleWhiteSpace]"
        variant="outlined"
        label="อีเมล"></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="[rules.ruleRequired]"
        variant="outlined"
        label="รหัสผ่าน"></v-text-field>
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
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      rules: useFormRules()
    }
  }
}
</script>
