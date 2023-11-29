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
            <div
              class="tw-flex tw-justify-center"
              v-if="slotProps.data.imageUrl">
              <img
                @click="
                  openDialog(
                    `${config.public.firebaseBaseUrl}${slotProps.data.imageUrl}`
                  )
                "
                :src="`${config.public.firebaseBaseUrl}${slotProps.data.imageUrl}`"
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
              <NuxtLink :to="`/skills/edit/${slotProps.data.skillId}`">
                <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
              </NuxtLink>
              <v-icon
                class="tw-cursor-pointer tw-text-rose-600"
                @click="
                  deleteSkill(slotProps.data.skillId, slotProps.data.name)
                "
                >mdi-delete</v-icon
              >
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <v-dialog
      v-model="dialog.openDialog"
      max-width="30%"
      @click:outside="closeDialog()">
      <img :src="dialog.image" class="tw-rounded-xl" />
    </v-dialog>
  </div>
</template>
<script>
import { useRuntimeConfig } from 'nuxt/app'
import SkillProvider from '~/resources/SkillProvider'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
      skills: [],
      config: useRuntimeConfig(),
      dialog: {
        openDialog: false,
        image: null,
      },
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
    async deleteSkill(id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบทักษะ ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.SkillService.deleteSkill(id)
          if (status.message === 'success') {
            this.getSkill()
            Swal.fire({
              icon: 'success',
              title: 'Delete Skill Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Skill Fail',
              text: `${status.status}`,
            })
          }
        }
      })
    },
    openDialog(image) {
      this.dialog.openDialog = true
      this.dialog.image = image
    },
    closeDialog() {
      this.dialog.openDialog = false
      this.dialog.image = null
    },
  },
}
</script>
