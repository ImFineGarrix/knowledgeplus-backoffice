<template>
  <div>
    <v-form ref="form" class="tw-space-y-4">
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
          ชื่อกลุ่ม<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p> 
          <div class="tw-pl-1">
            <v-tooltip text="กรุณากรอกชื่อของกลุ่มงานที่ต้องการสร้างเพื่อแบ่งกลุ่มอาชีพให้มีความเฉพาะเจาะจงยิ่งขึ้น โดยกรอกเป็นภาษาอังกฤษ และชื่อกลุ่มงานต้องสอดคล้องกับสายงานที่มีอยู่แล้ว เช่น Product Development, Data and Artificial Intelligence">
              <template v-slot:activator="{ props }">
                <v-icon v-bind:="props">mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </div>         
        </div>  
        <v-text-field
          variant="outlined"
          v-model.trim="form.name"
          :rules="[rules.ruleRequired, rules.ruleLength255]"></v-text-field>        
      </div>
      <div class="tw-space-y-2">
        <div class="tw-flex">
          <p class="text-lg tw-font-semibold">
          สายงาน<span class="tw-text-rose-600 tw-ml-2">*</span>
          </p>
          <div class="tw-pl-1">
            <v-tooltip text="กรุณาเลือกสายงาน (Section)  ที่สอดคล้องกับกลุ่มงานด้านบน โดยสามารถกดที่เครื่องหมายลูกศรเพื่อเลือกตัวเลือกภายใน Drop down list">
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
          v-model="form.sections"
          :rules="[rules.ruleArray]"
          :items="sections"
          item-title="name"
          item-value="sectionId"
          variant="outlined"></v-autocomplete>        
      </div>
      <div class="tw-flex tw-justify-end tw-pt-4">
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
import { useFormRules } from '~/composables/rules'
import GroupProvider from '~/resources/GroupProvider'
import SectionProvider from '~/resources/SectionProvider'

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
      GroupService: new GroupProvider(),
      SectionService: new SectionProvider(),
      rules: useFormRules(),
      form: {
        name: '',
        sections: [],
      },
      sections: []
    }
  },
  mounted () {
    if (this.idParams) {
      this.getGroupById(this.idParams)
    }
    this.getSection()
  },
  methods: {
    async getSection () {
      const { data } = await this.SectionService.getSection()
      this.sections = JSON.parse(JSON.stringify(data))
    },
    async getGroupById (id) {
      const { data } = await this.GroupService.getGroupById(id)
      this.form = {
        ...data,
        sections: data.sections.map((section) => section.sectionId)
      }
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
