<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ชื่อ<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรอกชื่อของบุคคลที่ต้องการเพิ่มเข้ามาเป็น Admin ในระบบ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.name"
          :rules="[rules.ruleRequired, rules.ruleLength255]"
          variant="outlined"></v-text-field>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            อีเมล<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กำหนดอีเมลที่จะใช้สำหรับยืนยันตัวตนแก่ Admin คนนั้น ๆ เมื่อเข้าสู่ระบบ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.email"
          :rules="[rules.ruleRequired, rules.ruleEmail]"
          variant="outlined"></v-text-field>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            รหัสผ่าน<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กำหนดรหัสผ่านสำหรับยืนยันตัวตนแก่ Admin คนนั้น ๆ เมื่อเข้าสู่ระบบ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.password"
          :rules="[rules.ruleRequired, rules.ruleLength255]"
          variant="outlined"></v-text-field>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ตำแหน่ง<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกตำแหน่งของบัญชีที่จะสร้าง">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          clearable
          :items="roles"
          item-title="label"
          item-value="val"
          :rules="[rules.ruleRequired]"
          v-model="form.role"
          variant="outlined" />
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
