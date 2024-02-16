<template>
  <div>
    <HeaderPage
      title="Skills"
      link="/skills/create"
      showBtn
      titleBtn="Create Skill" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="!error.isError">
          <div v-if="check.checkEmpty(skills)">
            <v-card>
              <DataTable :value="skills">
                <Column field="image" header="">
                  <template #header>
                    <div class="tw-py-5"></div>
                  </template>
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
                        class="tw-w-12 tw-h-12 tw-object-cover tw-rounded-xl tw-p-3" />
                    </div>
                    <div
                      v-else
                      class="tw-font-semibold tw-text-xs tw-flex tw-justify-center tw-text-black">
                      NO IMAGE
                    </div>
                  </template>
                </Column>
                <Column field="name" header="ชื่อทักษะ"></Column>
                <Column field="type" header="ประเภท">
                  <template #body="slotProps">
                    <p>{{ renameSoftAndHardSkill(slotProps.data.type) }}</p>
                  </template>
                </Column>
                <Column field="levels" header="Level">
                  <template #body="slotProps">
                    <div class="tw-flex tw-gap-4">
                      <div
                        v-for="(skillLevel, indexSkillLevel) in slotProps.data.skillsLevels"
                        :key="`skill-level-${indexSkillLevel}`">
                        <p
                          class="tw-px-3 tw-border-2 tw-border-gray-500 tw-rounded-full tw-py-2">
                          {{ getLevelName(skillLevel.levelId) }}
                        </p>
                      </div>
                    </div>
                  </template>
                </Column>
                <Column field="actionButton" header="" class="tw-w-2/12">
                  <template #body="slotProps">
                    <div
                      class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end tw-py-[20px]">
                      <NuxtLink :to="`/skills/edit/${slotProps.data.skillId}`">
                        <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                      </NuxtLink>
                      <v-icon
                        color="error"
                        class="tw-cursor-pointer"
                        @click="
                          deleteSkill(slotProps.data.skillId, slotProps.data.name)
                        "
                        >mdi-delete</v-icon
                      >
                    </div>
                  </template>
                </Column>
              </DataTable>
            </v-card>
            <div class="tw-my-10">
              <v-pagination
                v-model="page"
                :length="pages"
                :total-visible="7"></v-pagination>
            </div>
          </div>
          <EmptyData
            v-else
            name="NOT HAVE ANY SKILLS"
            desc="PLEASE ADD SKILL IN SKILLS PAGE" />
        </div>
        <MessageError v-else />
      </div>
      <Loading v-else />
    </div>
    <ImagePreview
      :status="dialog.openDialog"
      :img="dialog.image"
      isSkill
      @update-status="closeDialog" />
  </div>
</template>
<script>
import { useRuntimeConfig } from 'nuxt/app'
import SkillProvider from '~/resources/SkillProvider'
import LevelProvider from '~/resources/LevelProvider'
import Swal from 'sweetalert2'
import { useLevelStore } from '~/stores/Levels'
import { useCheck } from '~/composables/check'
export default {
  data() {
    return {
      SkillService: new SkillProvider(),
      LevelService: new LevelProvider(),
      LevelStore: useLevelStore(),
      skills: [],
      levels: [],
      ready: false,
      page: 1,
      pages: 1,
      total: 0,
      limit: 10,
      check: useCheck(),
      config: useRuntimeConfig(),
      dialog: {
        openDialog: false,
        image: null,
      },
      error: {
        isError: false,
        message: ''
      }
    }
  },
  watch: {
    page(newVal) {
      this.page = newVal
      this.getSkill()
    },
  },
  mounted() {
    if (!this.LevelStore.level.length) {
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
      } else {
        this.error.isError = true
      }
      this.ready = true
    },
    async getLevel() {
      const { data } = await this.LevelService.getLevel()
      this.LevelStore.setLevel(data)
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
            })
          }
        }
      })
    },
    renameSoftAndHardSkill (type) {
      if (type === 'SOFT') {
        return 'Soft Skill'
      }
      if (type === 'HARD') {
        return 'Hard Skill'
      }
      return ''
    },
    getLevelName (id) {
      if (id <= 6) {
        return this.LevelStore.level.hard.find((hd) => hd.levelId === id)?.level || ''
      }
      return this.LevelStore.level.soft.find((st) => st.levelId === id)?.level || ''
    },
    openDialog(image) {
      this.dialog.image = image
      this.dialog.openDialog = !!this.dialog.image
    },
    closeDialog() {
      this.dialog.openDialog = false
      this.dialog.image = null
    },
  },
}
</script>
