<template>
  <div>
    <HeaderPage
      title="Skills"
      link="/skills/create"
      showBtn
      titleBtn="Create Skill" />
    <div class="tw-my-8">
      <DataTable :value="skills">
        <Column field="image" header="">
          <template #body="slotProps">
            <div class="tw-flex tw-justify-center">
              <img
                @click="openDialog(slotProps.data.imageUrl)"
                :src="slotProps.data.imageUrl"
                :class="slotProps.data.imageUrl ? `tw-bg-emerald-600` : ''"
                class="tw-w-20 tw-rounded-xl tw-p-2" />
            </div>
          </template>
        </Column>
        <Column field="name" header="ทักษะ"></Column>
        <Column field="levelID" header="Level"></Column>
        <Column field="actionButton" header="" class="tw-w-2/12">
          <template #body="slotProps">
            <div class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end">
              <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
              <v-icon class="tw-cursor-pointer tw-text-rose-600"
                >mdi-delete</v-icon
              >
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script>
import SkillProvider from '~/resources/SkillProvider'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
      skills: [],
    }
  },
  mounted() {
    this.getSkill()
  },
  methods: {
    async getSkill() {
      const data = await this.SkillService.getSkill()
      if (data.message === 'success') {
        this.skills = JSON.parse(JSON.stringify(data.data))
      }
    },
  },
}
</script>
