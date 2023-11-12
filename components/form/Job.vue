<template>
  <div>
    <div class="tw-space-y-2">
      <v-text-field
        v-model="form.name"
        label="อาชีพ"
        variant="outlined"></v-text-field>
      <v-autocomplete
        v-model="form.category"
        label="สายงาน"
        variant="outlined"></v-autocomplete>
      <v-textarea
        v-model="form.shortDesc"
        label="คำอธิบายสั้น"
        variant="outlined" />
      <v-textarea v-model-="form.desc" label="คำอธิบาย" variant="outlined" />
      <div class="tw-flex tw-justify-end">
        <div
          class="tw-bg-[#51b462] tw-px-8 tw-py-2 tw-text-white tw-rounded-md tw-cursor-pointer">
          Create
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        category: '',
        shortDesc: '',
        desc: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
