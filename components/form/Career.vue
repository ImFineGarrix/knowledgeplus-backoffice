<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <v-text-field
        v-model.trim="form.name"
        :rules="[rules.ruleRequired, rules.ruleLength255]"
        label="ชื่ออาชีพ(ภาษาอังกฤษ)"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        clearable
        v-model="form.groups"
        :rules="[rules.ruleArray]"
        :items="groups"
        item-title="name"
        item-value="groupId"
        label="กลุ่มสายงาน"
        variant="outlined" />
      <v-autocomplete
        chips
        multiple
        clearable
        v-model="form.skillsLevels"
        :items="skillsLevels"
        item-title="name"
        item-value="skillLevel"
        label="ทักษะ"
        variant="outlined" />
      <v-textarea
        variant="outlined"
        label="คำอธิบาย"
        v-model="form.description"></v-textarea>
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
import GroupProvider from '~/resources/GroupProvider'
import SkillProvider from '@/resources/SkillProvider'
import CareerProvider from '@/resources/CareerProvider'
import LevelProvider from '~/resources/LevelProvider'

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
      CareerService: new CareerProvider(),
      SkillService: new SkillProvider(),
      GroupService: new GroupProvider(),
      LevelService: new LevelProvider(),
      LevelStore: useLevelStore(),
      groups: [],
      skillsLevels: [],
      form: {
        name: '',
        groups: [],
        skillsLevels: [],
        description: '',
      },
      rules: useFormRules(),
    }
  },
  mounted() {
    if (this.idParams) {
      this.getCareerById(this.idParams)
    }
    if (!this.LevelStore.level.length) {
      this.getLevel()
    }
    this.getSection()
    this.getSkill()
  },
  methods: {
    async getSection() {
      const { data } = await this.GroupService.getGroup()
      this.groups = JSON.parse(JSON.stringify(data))
    },
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
    async getCareerById(id) {
      const { data } = await this.CareerService.getCareerById(id)
      this.form = {
        ...data,
        skillsLevels: data.skillsLevels.map((skill) => ({skillId: skill.skillId, levelId: skill.levelId})),
        groups: data.groups.map((group) => group.groupId),
      }
    },
    getLevelName (id) {
      if (id <= 6) {
        return this.LevelStore.level.hard.find((hd) => hd.levelId === id)?.level || ''
      }
      return this.LevelStore.level.soft.find((st) => st.levelId === id)?.level || ''
    },
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
