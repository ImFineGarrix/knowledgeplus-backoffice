<template>
  <div>
    <div class="tw-space-y-2">
      <v-text-field
        v-model.trim="form.label"
        label="ชื่ออาชีพ(ใช้สำหรับแสดงบนเว็บ)"
        variant="outlined" />
      <v-text-field
        v-model.trim="form.value"
        label="ชื่ออาชีพ(ใช้สำหรับในระบบ ห้ามเว้นวรรค)"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        v-model="form.category"
        label="สายงาน"
        variant="outlined" />
      <v-textarea
        v-model="form.shortDesc"
        label="คำอธิบายสั้น"
        variant="outlined" />
      <v-textarea v-model="form.desc" label="คำอธิบาย" variant="outlined" />
      <div class="tw-flex tw-justify-end">
        <div
          class="tw-bg-[#51b462] tw-px-8 tw-py-2 tw-text-white tw-rounded-md tw-cursor-pointer">
          {{ actionButton }}
        </div>
      </div>
    </div>
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
  data() {
    return {
      form: {
        label: '',
        value: '',
        category: [],
        shortDesc: '',
        desc: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
