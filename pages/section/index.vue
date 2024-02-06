<template>
  <div>
    <HeaderPage
      title="Section"
      showBtn
      titleBtn="Create Section"
      link="/section/create" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="checkEmpty(categories)">
          <v-card>
            <DataTable :value="categories">
              <Column field="imageUrl" header="" class="tw-w-2/12 tw-py-2">
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
                      class="tw-w-16 tw-h-16 tw-object-cover tw-rounded-xl tw-p-2" />
                  </div>
                  <div
                    v-else
                    class="tw-font-semibold tw-text-xs tw-flex tw-justify-center tw-text-black">
                    NO IMAGE
                  </div>
                </template>
              </Column>
              <Column field="name" header="สายงาน"></Column>
              <Column field="actionButton" header="" class="tw-w-2/12">
                <template #body="slotProps">
                  <div
                    :class="slotProps.data.imageUrl ? '' : 'tw-py-8'"
                    class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end">
                    <NuxtLink
                      :to="`/categories/edit/${slotProps.data.categoryId}`">
                      <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                    </NuxtLink>
                    <v-icon
                      color="error"
                      class="tw-cursor-pointer"
                      @click="
                        deleteCategory(
                          slotProps.data.categoryId,
                          slotProps.data.name
                        )
                      "
                      >mdi-delete</v-icon
                    >
                  </div>
                </template>
              </Column>
            </DataTable>
          </v-card>
        </div>
        <EmptyData
          v-else
          name="NOT HAVE ANY CATEGORIES"
          desc="PLEASE ADD CATEGORY IN CATEGORIES PAGE" />
      </div>
      <Loading v-else />
    </div>
    <ImagePreview
      :status="dialog.openDialog"
      :img="dialog.image"
      @update-status="closeDialog" />
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
      ready: false,
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
        this.ready = true
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
            })
          }
        }
      })
    },
    openDialog(image) {
      this.dialog.image = image
      this.dialog.openDialog = !!this.dialog.image
    },
    closeDialog() {
      this.dialog.openDialog = false
      this.dialog.image = null
    },
    checkEmpty(items) {
      return !!items.length
    },
  },
}
</script>

<style lang="scss" scoped></style>
