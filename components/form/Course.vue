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
          :rules="[rules.ruleRequired]"
          label="เวลา (ชั่วโมง)"
          variant="outlined"></v-text-field>
        <v-text-field
          v-model="form.academicYear"
          :rules="[rules.ruleRequired]"
          label="ปี (ค.ศ.)"
          variant="outlined"></v-text-field>
      </div>
      <div class="tw-space-y-2 tw-pb-4">
        <p class="text-lg tw-font-semibold">คำอธิบาย</p>
        <Editor v-model="form.description" />
      </div>
      <div class="tw-space-y-2 tw-pb-4">
        <p class="text-lg tw-font-semibold">Learning Outcome</p>
        <Editor v-model="form.learningOutcome" />
      </div>
      <v-autocomplete
        v-model="form.skillsLevels"
        :items="skillsLevels"
        item-title="name"
        item-value="skillLevel"
        clearable
        chips
        multiple
        label="ทักษะ"
        :rules="[rules.ruleArray]"
        variant="outlined" />
      <v-autocomplete
        v-model="form.organizationId"
        clearable
        chips
        label="องค์กร"
        :items="organizations"
        item-title="name"
        item-value="organizationId"
        :rules="[rules.ruleRequired]"
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
import SkillProvider from '~/resources/SkillProvider'
import OrganizationProvider from '~/resources/OrganizationProvider'
import CourseProvider from '~/resources/CourseProvider'
import LevelProvider from '~/resources/LevelProvider'

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
      LevelService: new LevelProvider(),
      SkillService: new SkillProvider(),
      OrganizationService: new OrganizationProvider(),
      CourseService: new CourseProvider(),
      LevelStore: useLevelStore(),
      form: {
        name: '',
        description: '',
        learningOutcome: '',
        learnHours: '',
        academicYear: '',
        courseLink: '',
        organizationId: null,
        skillsLevels: [],
      },
      organizations: [],
      skillsLevels: [],
      rules: useFormRules(),
    }
  },
  mounted () {
    if (this.idParams) {
      this.getCourseById(this.idParams)
    }
    if (!this.LevelStore.level.length) {
      this.getLevel()
    }
    this.getSkill()
    this.getOrganization()
  },
  methods: {
    async getSkill() {
      const { data } = await this.SkillService.getSkill(1, 9999)
      const transformedSkills = []
      data.skills.forEach((skill) => {
        skill.skillsLevels.forEach((skillLevel) => {
          transformedSkills.push({
            name: `${skill.name} (${this.getLevelName(skillLevel.levelId)})`,
            skillLevel: {
              skillId: skill.skillId,
              levelId: skillLevel.levelId
            }
          })
        })
      })

      this.skillsLevels = transformedSkills
    },
    async getLevel () {
      const { data } = await this.LevelService.getLevel()
      this.LevelStore.setLevel(data)
    },
    async getOrganization () {
      const { data } = await this.OrganizationService.getOrganization()
      this.organizations = data
    },
    async getCourseById (id) {
      const { data } = await this.CourseService.getCourseById(id)
      this.form = {
        ...data,
        skillsLevels: data.skillsLevels.map((skill) => ({skillId: skill.skillId, levelId: skill.levelId})),
      }
    },
    getLevelName (id) {
      if (id <= 6) {
        return this.LevelStore.level.hard.find((hd) => hd.levelId === id)?.level || ''
      }
      return this.LevelStore.level.soft.find((st) => st.levelId === id)?.level || ''
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$emit('create-update', this.form);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    },
  }
}
</script>
