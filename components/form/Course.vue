<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <v-text-field label="ชื่อคอร์ส(ภาษาอังกฤษ)" variant="outlined" />
      <v-text-field label="link" variant="outlined" />
      <div class="tw-grid tw-gap-10 tw-grid-cols-2">
        <v-text-field label="เวลา (ชั่วโมง)" variant="outlined"></v-text-field>
        <v-text-field label="ปี (ค.ศ.)" variant="outlined"></v-text-field>
      </div>
      <v-textarea label="คำอธิบาย" variant="outlined" />
      <div
        v-for="(skillLevel, indexSkillLevel) in form.skillLevels"
        :key="`skill-level-${indexSkillLevel}`">
        <v-autocomplete
          clearable
          multiple
          chips
          label="ระดับทักษะ"
          variant="outlined" />
        <v-textarea label="คำอธิบาย Knowledge" variant="outlined" />
        <v-textarea label="คำอธิบาย Ability" variant="outlined" />
        <div
          v-if="form.skillLevels.length !== 1"
          @click="removeSkillLevelFollyByIndex(indexSkillLevel)"
          class="tw-cursor-pointer tw-flex tw-justify-end tw-pb-4">
          <div class="tw-bg-rose-600 tw-py-1 tw-px-5 tw-rounded-md">
            <v-icon color="white">mdi-minus</v-icon>
          </div>
        </div>
      </div>
      <div @click="addSkillLevel()" class="tw-cursor-pointer tw-flex tw-pb-4">
        <div class="tw-bg-emerald-600 tw-py-1 tw-px-5 tw-rounded-md">
          <v-icon color="white">mdi-plus</v-icon>
        </div>
      </div>
      <v-autocomplete clearable chips label="Organization" variant="outlined" />
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
        skillLevels: [
          {
            levelId: '',
            abilityDesc: '',
            knowledgeDesc: ''
          }
        ]
      }
    }
  },
  methods: {
    addSkillLevel () {
      this.form.skillLevels.push({
        levelId: '',
        abilityDesc: '',
        knowledgeDesc: ''
      })
    },
    removeSkillLevelFollyByIndex (index) {
      this.form.skillLevels.splice(index, 1)
    }
  }
}
</script>
