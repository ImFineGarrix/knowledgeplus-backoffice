<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ชื่ออาชีพ(ภาษาอังกฤษ)<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณากรอกชื่ออาชีพที่ต้องการแนะนำในระบบ โดยกำหนดเป็นภาษาอังกฤษ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.name"
          :rules="[rules.ruleRequired, rules.ruleLength255]"
          placeholder="Frontend Developer"
          variant="outlined" />
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            กลุ่มสายงาน<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกกลุ่มสายงาน (Group) ที่สอดคล้องกับอาชีพด้านบน">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          chips
          multiple
          clearable
          v-model="form.groups"
          :rules="[rules.ruleArray]"
          :items="groups"
          item-title="name"
          item-value="groupId"
          variant="outlined" />
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ทักษะ<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกทักษะที่อาชีพนี้ต้องการในการทำงาน">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          chips
          multiple
          clearable
          v-model="form.skillsLevels"
          placeholder="Applications Development"
          :items="skillsLevels"
          item-title="name"
          item-value="skillLevel"
          :rules="[rules.ruleArray]"
          variant="outlined" />
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            คำอธิบาย
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="สามารถกรอกคำอธิบายของอาชีพ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>  
        </div>
        <v-textarea
          variant="outlined"
          placeholder="ทำงานเกี่ยวข้องกับอะไร จุดเด่น จุดด้อย"
          v-model="form.description"></v-textarea>
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
              skillsLevelsId: skillLevel.skillsLevelsId,
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
        skillsLevels: data.skillsLevels.map((skill) => ({skillsLevelsId: skill.skillsLevelsId, skillId: skill.skillId, levelId: skill.levelId})),
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
