<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <v-text-field
        v-model.trim="form.name"
        :rules="[rules.ruleRequired, rules.ruleLength255]"
        variant="outlined"
        label="ชื่อ"></v-text-field>
      <v-text-field
        v-model.trim="form.email"
        :rules="[rules.ruleRequired, rules.ruleEmail]"
        variant="outlined"
        label="อีเมล"></v-text-field>
      <v-text-field
        v-model.trim="form.password"
        :rules="[rules.ruleRequired, rules.ruleLength255]"
        variant="outlined"
        label="รหัสผ่าน"></v-text-field>
      <v-autocomplete
        clearable
        label="ตำแหน่ง"
        :items="roles"
        item-title="label"
        item-value="val"
        :rules="[rules.ruleRequired]"
        v-model="form.role"
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
import AdminProvider from '~/resources/AdminProvider';
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
      AdminService: new AdminProvider(),
      form: {
        name: '',
        email: '',
        password: '',
        role: null
      },
      rules: useFormRules(),
      roles: [{ label: 'Admin', val: 'admin' }]
    }
  },
  mounted () {
    if (this.idParams) {
      this.getAdminById(this.idParams)
    }
  },
  methods: {
    async getAdminById (id) {
      const { data } = await this.AdminService.getAdminById(id)
      this.form = data
    },
    async setForm () {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        this.$emit('create-update', this.form)
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
