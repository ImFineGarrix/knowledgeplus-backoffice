<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <v-text-field
        v-model="form.name"
        label="ชื่อคอร์ส(ภาษาอังกฤษ)"
        :rules="[rules.ruleRequired]"
        variant="outlined" />
      <v-text-field
        v-model="form.courseLink"
        :rules="[rules.ruleRequired]"
        label="link"
        variant="outlined" />
      <div class="tw-grid tw-gap-10 tw-grid-cols-2">
        <v-text-field
          v-model="form.learnHours"
          label="เวลา (ชั่วโมง)"
          variant="outlined"></v-text-field>
        <v-text-field
          v-model="form.academicYear"
          label="ปี (ค.ศ.)"
          variant="outlined"></v-text-field>
      </div>
      <div class="tw-space-y-2 tw-pb-4">
        <p class="text-lg tw-font-semibold">คำอธิบาย</p>
        <Editor v-model="form.description" />
      </div>
      <v-autocomplete clearable chips label="ทักษะ" variant="outlined" />
      <v-autocomplete clearable chips label="อาชีพ" variant="outlined" />
      <v-autocomplete clearable chips label="องค์กร" variant="outlined" />
      <div class="tw-flex tw-justify-end">
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
      default: () => ''
    }
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        learnHours: '',
        academicYear: '',
        courseLink: '',
        organization: [],
      },
      rules: useFormRules(),
    }
  }
}
</script>
