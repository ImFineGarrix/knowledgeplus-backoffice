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
            <div class="tw-flex tw-justify-center">
              <img
                @click="openDialog(slotProps.data.imageUrl)"
                :src="slotProps.data.imageUrl"
                class="tw-w-20 tw-rounded-xl tw-p-2" />
            </div>
          </template>
        </Column>
        <Column field="label" header="สายงาน (ใช้สำหรับหน้าเว็บ)"></Column>
        <Column field="value" header="สายงาน (ใช้ในระบบ)"></Column>
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
    <v-dialog
      v-model="dialog.openDialog"
      max-width="30%"
      @click:outside="closeDialog()">
      <img :src="dialog.image" class="tw-rounded-xl" />
    </v-dialog>
  </div>
</template>

<script>
import CategoryProvider from '@/resources/CategoryProvider'

export default {
  data() {
    return {
      CategoryService: new CategoryProvider(),
      categories: [],
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
      const data = await this.CategoryService.getCategory()
      this.categories = JSON.parse(JSON.stringify(data.data))
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
