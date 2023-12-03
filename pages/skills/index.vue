<template>
  <div>
    <HeaderPage
      title="Skills"
      link="/skills/create"
      showBtn
      titleBtn="Create Skill" />
    <div class="tw-my-8">
      <div v-if="ready">
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
                  class="tw-w-12 tw-rounded-xl tw-p-2" />
              </div>
            </template>
          </Column>
          <Column field="name" header="ทักษะ"></Column>
          <Column field="levels" header="Level">
            <template #body="slotProps">
              <div class="tw-uppercase">
                {{ getLevelName(slotProps.data.levelId) }}
              </div>
            </template>
          </Column>
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
        <div class="tw-my-4">
          <v-pagination
            v-model="page"
            :length="pages"
            :total-visible="7"></v-pagination>
        </div>
      </div>
      <Loading v-else />
    </div>
    <v-dialog
      v-model="dialog.openDialog"
      max-width="40%"
      @click:outside="closeDialog()">
      <img :src="dialog.image" class="tw-rounded-xl" />
    </v-dialog>
  </div>
</template>
<script>
import { useRuntimeConfig } from 'nuxt/app'
import SkillProvider from '~/resources/SkillProvider'
import LevelProvider from '~/resources/LevelProvider'
import Swal from 'sweetalert2'
import { useLevelStore } from '~/stores/Levels'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
      LevelService: new LevelProvider(),
      levelStore: useLevelStore(),
      skills: [],
      levels: [],
      ready: false,
      page: 1,
      pages: 1,
      total: 0,
      limit: 10,
      config: useRuntimeConfig(),
      dialog: {
        openDialog: false,
        image: null,
      },
    }
  },
  watch: {
    page(newVal) {
      this.page = newVal
      this.getSkill()
    },
  },
  mounted() {
    if (!this.levelStore.level.length) {
      this.getLevel()
    }
    this.getSkill()
  },
  methods: {
    getPages() {
      return Math.ceil(this.total / this.limit)
    },
    async getSkill() {
      const status = await this.SkillService.getSkill(this.page, this.limit)
      if (status.message === 'success') {
        const { data } = status
        this.skills = JSON.parse(JSON.stringify(data.skills))
        this.page = data.pagination.page
        this.total = data.pagination.total
        this.pages = this.getPages()
        this.ready = true
      }
    },
    async getLevel() {
      const { data } = await this.LevelService.getLevel()
      this.levelStore.setLevel(data)
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
    getLevelName(id) {
      return (
        this.levelStore.level.find((level) =>
          level.levelId === id ? level : ''
        )?.name || ''
      )
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
