<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field label="ชื่อกลุ่ม" variant="outlined"></v-text-field>
      <v-autocomplete
        chips
        multiple
        clearable
        label="section"
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
};
</script>
