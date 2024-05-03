<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ชื่อคอร์ส(ภาษาอังกฤษ)<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip
              text="ให้ผู้ใช้กรอกชื่อของคอร์สเรียน/รายวิชาที่ต้องการแนะนำบนเว็บไซต์ โดยกำหนดเป็นภาษาอังกฤษ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.name"
          :rules="[rules.ruleRequired, rules.ruleLength255]"
          placeholder="Agile Software Development I"
          variant="outlined" />
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ประเภท<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip class="tw-w-7/12">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
              <div>
                <p>
                  กรุณาเลือกประเภทของทักษะที่ผู้ใช้จะได้รับ
                  (Hardskill/Softskill) ที่สอดคล้องกับคอร์สเรียน
                </p>
                <p class="tw-mt-3 tw-text-xl tw-font-bold">Hard Skill</p>
                <p class="tw-text-sm">- {{ LevelStore.typeDesc.hard }}</p>
                <p class="tw-mt-3 tw-text-xl tw-font-bold">Soft Skill</p>
                <p class="tw-text-sm">- {{ LevelStore.typeDesc.soft }}</p>
              </div>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          clearable
          v-model="form.courseType"
          :items="typeSkill"
          item-title="label"
          item-value="val"
          :rules="[rules.ruleRequired]"
          variant="outlined" />
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            link<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip>
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
              <div class="tw-p-3">
                <p class="text-lg">
                  URL ที่มาของคอร์สเรียน
                  กรอกไว้สำหรับให้ผู้เรียนเข้าถึงเพื่อเรียนคอร์สเรียนนั้น ๆ
                  ในกรณีที่เป็นรายวิชาของมหาวิทยาลัย
                </p>
                <p class="text-lg">
                  และไม่มีรายละเอียดคอร์สเรียนบนหน้าเว็บไซต์ สามารถกรอกเป็น link
                  เอกสารหลักสูตรของมหาวิทยาลัยได้
                </p>
                <p class="tw-pr-3 tw-pt-3 tw-pb-3">
                  บนเว็บไซต์หลักจะอยู่ในรูปปุ่มเพื่อกด link ไปเว็บอื่น
                </p>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/knowledge-project-7e224.appspot.com/o/tooltip%2Flink.png?alt=media&token=8b8529ac-31d6-4fde-ac12-b9b1df89cd9a"
                  alt="link" />
              </div>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.courseLink"
          :rules="[rules.ruleRequired]"
          placeholder="https://www.sit.kmutt.ac.th"
          variant="outlined" />
      </div>
      <div class="tw-grid tw-gap-10 tw-grid-cols-2">
        <div class="tw-space-y-2">
          <div class="tw-flex">
            <p class="text-lg tw-font-semibold">เวลา (ชั่วโมง)</p>
            <div class="tw-pl-1">
              <v-tooltip
                text="กรอกจำนวนเวลาที่ใช้ในการเรียนการสอนทั้งหมดในคอร์สนั้น ๆ โดยคุณสามารถบอกระยะเวลาในการเรียนต่อครั้งได้ เช่น 48 (3 ชั่วโมง/ครั้ง)">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind:="props">mdi-information-outline </v-icon>
                </template>
              </v-tooltip>
            </div>
          </div>
          <v-text-field
            v-model="form.learnHours"
            variant="outlined"></v-text-field>
        </div>
        <div class="tw-space-y-2">
          <div class="tw-flex">
            <p class="text-lg tw-font-semibold">ปี (ค.ศ.)</p>
            <div class="tw-pl-1">
              <v-tooltip
                text="กรอกเลขปีค.ศ.ที่คอร์สเรียนถูกกำหนด/สร้างขึ้นมา หรือเลขปีการศึกษาตามที่ระบุในเอกสารหลักสูตรของมหาวิทยาลัย">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind:="props">mdi-information-outline </v-icon>
                </template>
              </v-tooltip>
            </div>
          </div>
          <v-text-field
            v-model.trim="form.academicYear"
            variant="outlined"></v-text-field>
        </div>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">คำอธิบาย</p>
          <div class="tw-pl-1">
            <v-tooltip text="สามารถกรอกคำอธิบายของรายวิชา">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-textarea variant="outlined" v-model="form.description"></v-textarea>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">Learning Outcome</p>
          <div class="tw-pl-1">
            <v-tooltip
              text="สามารถกรอกผลการเรียนรู้ที่คาดหวัง (Learning Outcome) ของคอร์สเรียน">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-textarea
          variant="outlined"
          v-model="form.learningOutcome"></v-textarea>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ทักษะ<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกทักษะที่ผู้ใช้จะได้รับจากคอร์สเรียนนี้">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          v-model="form.skillsLevels"
          :items="skillsLevels"
          item-title="name"
          item-value="skillLevel"
          clearable
          chips
          multiple
          :rules="[rules.ruleArray]"
          variant="outlined" />
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            องค์กร<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกองค์กรที่เป็นเจ้าของคอร์สเรียนนี้">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          v-model="form.organizationId"
          clearable
          chips
          :items="organizations"
          item-title="name"
          item-value="organizationId"
          :rules="[rules.ruleRequired]"
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
import SkillProvider from '~/resources/SkillProvider'
import OrganizationProvider from '~/resources/OrganizationProvider'
import CourseProvider from '~/resources/CourseProvider'
import LevelProvider from '~/resources/LevelProvider'
import { useLevelStore } from '~/stores/Levels'

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
        courseType: 'HARD',
        learningOutcome: '',
        learnHours: '',
        academicYear: '',
        courseLink: '',
        organizationId: null,
        skillsLevels: [],
      },
      typeSkill: [
        {
          label: 'Softskill',
          val: 'SOFT',
        },
        {
          label: 'Hardskill',
          val: 'HARD',
        },
      ],
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
    async getOrganization () {
      const { data } = await this.OrganizationService.getOrganization()
      this.organizations = data
    },
    async getCourseById (id) {
      const { data } = await this.CourseService.getCourseById(id)
      this.form = {
        ...data,
        skillsLevels: data.skillsLevels.map((skill) => ({skillsLevelsId: skill.skillsLevelsId ,skillId: skill.skillId, levelId: skill.levelId})),
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
