<template>
  <div>
    <v-form ref="form" class="tw-space-y-2">
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ชื่อทักษะ(ภาษาอังกฤษ)<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณากรอกชื่อของทักษะที่ต้องการเพิ่มเข้าไปในระบบ โดยกรอกเป็นภาษาอังกฤษ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-text-field
          v-model.trim="form.name"
          :rules="[rules.ruleRequired, rules.ruleLength255]"
          placeholder="เช่น Software Testing"
          variant="outlined" />
      </div>
      <div class="tw-pb-4 tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            อัปโหลดไอคอนทักษะ (แนะนำเป็นไฟล์ SVG)<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip>
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
              <div class="tw-p-3">
                <p class="text-lg tw-font-semibold">อัปโหลดภาพที่เกี่ยวข้องกับทักษะที่คุณกรอกด้านบน</p>
                <p class="tw-pr-3 tw-pt-3 tw-pb-3">ผลลัพธ์บนเว็บไซต์หลัก ดังตัวอย่าง</p>
                <div class="tw-flex">
                  <div>
                    <img src="../images/skill_card.png" alt="รูปตัวอย่าง" class="tw-pr-5">
                    <p class="tw-flex tw-justify-center tw-pt-2">icon บน card หน้า Skills</p>
                  </div>
                  <div>
                    <img src="../images/skill_dt.png" alt="">
                    <p class="tw-flex tw-justify-center tw-pt-2">icon บน Skill Detail Page</p>
                  </div>
                </div>
              </div>
            </v-tooltip>
          </div>
        </div>
        <div v-if="checkImage()">
          <label for="upload-image" class="tw-cursor-pointer">
            <div
              :class="validImage ? 'tw-bg-rose-100 tw-border-rose-600' : ''"
              class="tw-w-full tw-h-40 tw-border-2 tw-flex tw-justify-center tw-items-center tw-border-dotted tw-border-black tw-bg-[#F4F4F4] tw-font-semibold tw-text-[#626262]">
              <v-icon :color="validImage ? 'error' : ''" size="x-large"
                >mdi-image-filter-hdr</v-icon
              >
            </div>
          </label>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            hidden
            @change="uploadImage($event)" />
        </div>
        <div v-else>
          <div
            class="tw-relative tw-w-full tw-h-64 tw-border tw-flex tw-justify-center tw-border-black hover-image">
            <div
              class="delete-image tw-absolute tw-text-rose-500 tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%] tw-bg-white tw-p-5 tw-rounded-full tw-shadow-xl tw-cursor-pointer">
              <IconDelete @click="removeImage()" />
            </div>
            <div class="tw-flex tw-items-center">
              <img
                class="tw-h-40 tw-w-auto"
                :src="
                  previewImage ||
                  `${config.public.firebaseBaseUrl}${form.imageUrl}`
                " />
            </div>
          </div>
        </div>
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
          คำอธิบาย
          </p> 
          <div class="tw-pl-1">
            <v-tooltip text="สามารถกรอกคำอธิบายของทักษะ โดยกรอกเป็นภาษาอังกฤษ">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>         
        </div>  
        <v-textarea
          variant="outlined"
          placeholder="ข้อมูลภาพรวมของทักษะ เช่น เกี่ยวข้องกับอะไร ภาพรวมความสามารถ"
          v-model="form.description"></v-textarea>        
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
            ประเภท<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกประเภทของทักษะว่าเป็นเชิงเทคนิค หรือ soft-skill">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>
        </div>
        <v-autocomplete
          clearable
          v-model="form.type"
          :items="typeSkill"
          item-title="label"
          item-value="val"
          :rules="[rules.ruleRequired]"
          variant="outlined" />
      </div>
      <div
        v-for="(skillLevel, indexSkillLevel) in form.skillsLevels"
        :key="`skill-level-${indexSkillLevel}`"
        class="tw-space-y-4">
        <div class="tw-space-y-2">
          <div class="tw-flex">
            <p class="text-lg tw-font-semibold">
              ระดับทักษะ<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
            </p>
            <div class="tw-pl-1">
              <v-tooltip text="กรุณาเลือก level ของทักษะเพื่อกรอกคำอธิบายที่ต่างกันในแต่ละ level โดยสามารถกดเครื่องหมาย + ด้านล่างเพื่อเพิ่มข้อมูลใน level อื่น ๆ ได้">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind:="props">mdi-information-outline </v-icon>
                </template>
              </v-tooltip>
            </div>  
          </div>
          <v-autocomplete
            clearable
            v-model="skillLevel.levelId"
            :items="levelFollwByType"
            item-title="level"
            item-value="levelId"
            :rules="[rules.ruleRequired]"
            chips
            variant="outlined" />
        </div>
        <div class="tw-space-y-2">
          <div class="tw-flex">
            <p class="text-lg tw-font-semibold">
              คำอธิบาย Knowledge<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
            </p>
            <div class="tw-pl-1">
              <v-tooltip text="กรอกองค์ความรู้ (Knowledge) ที่จำเป็นต้องมีของทักษะใน level ที่ระบุด้านบน เขียนแบ่งเป็นข้อ ๆ โดยกรอกเป็นภาษาอังกฤษ">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind:="props">mdi-information-outline </v-icon>
                </template>
              </v-tooltip>
            </div>  
          </div>
          <v-textarea
          variant="outlined"
          :rules="[rules.ruleRequired]"
          placeholder="เช่น o Basic troubleshooting techniques
o Types of application performance statistics
o Interpretation of application logs
"
          v-model="skillLevel.knowledgeDesc"></v-textarea>
        </div>
        <div class="tw-space-y-2">
          <div class="tw-flex">
            <p class="text-lg tw-font-semibold">
              คำอธิบาย Ability<span
              class="tw-text-rose-600 tw-ml-2"
              >*</span
            >
            </p>
            <div class="tw-pl-1">
              <v-tooltip text="กรอกความสามารถ (Ability) ที่จำเป็นต้องมีของทักษะใน level ที่ระบุด้านบน เขียนแบ่งเป็นข้อ ๆ โดยกรอกเป็นภาษาอังกฤษ">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind:="props">mdi-information-outline </v-icon>
                </template>
              </v-tooltip>
            </div>  
          </div>
          <v-textarea
          variant="outlined"
          :rules="[rules.ruleRequired]"
          placeholder="เช่น o Carry out basic troubleshooting to address commonly-encountered problems with the application
o Draw inferences from the collated performance statistics and logs of the application"
          v-model="skillLevel.abilityDesc"></v-textarea>
        </div>
        <div
            v-if="form.skillsLevels.length !== 1"
            @click="removeSkillLevelFollyByIndex(indexSkillLevel)"
            class="tw-cursor-pointer tw-flex tw-justify-end tw-pb-4">
            <div class="tw-bg-rose-600 tw-py-1 tw-px-5 tw-rounded-md">
              <v-icon color="white">mdi-minus</v-icon>
            </div>
        </div>
      </div>
      <div
        @click="addSkillLevel()"
        class="tw-cursor-pointer tw-flex tw-pb-4 tw-pt-2">
          <div class="tw-bg-emerald-600 tw-py-1 tw-px-5 tw-rounded-md">
            <v-icon color="white">mdi-plus</v-icon>
          </div>
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
import LevelProvider from '~/resources/LevelProvider'
import SkillProvider from '~/resources/SkillProvider'
import { useRuntimeConfig } from 'nuxt/app'
import { useLevelStore } from '~/stores/Levels'

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
      LevelService: new LevelProvider(),
      SkillService: new SkillProvider(),
      form: {
        name: '',
        description: '',
        imageUrl: null,
        type: null,
        skillsLevels: [{
          levelId: null,
          abilityDesc: '',
          knowledgeDesc: ''
        }]
      },
      rules: useFormRules(),
      LevelStore: useLevelStore(),
      previewImage: null,
      config: useRuntimeConfig(),
      validImage: false,
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
    }
  },
  computed: {
    levelFollwByType () {
      if (this.form.type === 'SOFT') {
        return this.LevelStore.level.soft
      }
      return this.LevelStore.level.hard
    }
  },
  mounted() {
    if (this.idParams) {
      this.getSkillById(this.idParams)
    }
    if (!this.LevelStore.level.length) {
      this.getLevel()
    }
  },
  methods: {
    async getLevel() {
      const { data } = await this.LevelService.getLevel()
      this.LevelStore.setLevel(data)
    },
    async getSkillById(id) {
      const { data } = await this.SkillService.getSkillById(id)
      this.form = data
    },
    uploadImage(e) {
      const file = e.target.files[0]
      this.form.imageUrl = file
      this.previewImage = URL.createObjectURL(file)
    },
    checkImage() {
      return !this.previewImage && !this.form.imageUrl
    },
    removeImage() {
      this.previewImage = null
      this.form.imageUrl = null
    },
    addSkillLevel () {
      this.form.skillsLevels.push({
        levelId: null,
        abilityDesc: '',
        knowledgeDesc: ''
      })
    },
    removeSkillLevelFollyByIndex (index) {
      this.form.skillsLevels.splice(index, 1)
    },
    async setForm() {
      const { valid } = await this.$refs.form.validate()
      if (valid && this.form.imageUrl) {
        this.$emit('create-update', this.form)
      } else {
        if (!this.form.imageUrl) {
          this.validImage = true
        }
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
