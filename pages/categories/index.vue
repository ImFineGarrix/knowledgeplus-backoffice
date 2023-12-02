<template>
  <div>
    <HeaderPage
      title="Categories"
      showBtn
      titleBtn="Create Category"
      link="/categories/create" />
    <div class="tw-my-8">
      <DataTable :value="categories">
        <Column field="imageUrl" header="" class="tw-w-2/12">
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
                class="tw-w-20 tw-rounded-xl tw-p-2" />
            </div>
          </template>
        </Column>
        <Column field="name" header="สายงาน (ใช้สำหรับหน้าเว็บ)"></Column>
        <Column field="actionButton" header="" class="tw-w-2/12">
          <template #body="slotProps">
            <div class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end">
              <NuxtLink :to="`/categories/edit/${slotProps.data.categoryId}`">
                <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
              </NuxtLink>
              <v-icon
                class="tw-cursor-pointer tw-text-rose-600"
                @click="
                  deleteCategory(slotProps.data.categoryId, slotProps.data.name)
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
      max-width="70%"
      @click:outside="closeDialog()">
      <img :src="dialog.image" class="tw-rounded-xl" />
    </v-dialog>
  </div>
</template>

<script>
import { useRuntimeConfig } from 'nuxt/app'
import CategoryProvider from '@/resources/CategoryProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      CategoryService: new CategoryProvider(),
      categories: [],
      config: useRuntimeConfig(),
      dialog: {
        openDialog: false,
        image: null,
      },
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      const status = await this.CategoryService.getCategory()
      if (status.message === 'success') {
        this.categories = JSON.parse(JSON.stringify(status.data))
      }
    },
    async deleteCategory(id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบสายงาน ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.CategoryService.deleteCategory(id)
          if (status.message === 'success') {
            this.getCategory()
            Swal.fire({
              icon: 'success',
              title: 'Delete Category Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Category Fail',
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

<style lang="scss" scoped></style>
