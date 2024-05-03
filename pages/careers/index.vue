<template>
  <div>
    <HeaderPage
      title="Careers"
      link="/careers/create"
      showBtn
      titleBtn="Create Career" />
    <div class="tw-my-8">
      <div v-if="ready">
        <div v-if="!error.isError">
          <div v-if="checkEmpty(careers)">
            <v-card>
              <DataTable :value="careers">
                <Column field="name" header="อาชีพ">
                  <template #header>
                    <div class="tw-py-6 tw-px-3"></div>
                  </template>
                  <template #body="slotProps">
                    <div class="tw-px-6">{{ slotProps.data.name }}</div>
                  </template>
                </Column>
                <Column field="groups" header="กลุ่มสายงาน">
                  <template #body="slotProps">
                    <div class="tw-flex tw-gap-4">
                      <div
                        v-for="(group, indexGroup) in slotProps.data.groups"
                        :key="`group-${indexGroup}`">
                        <p
                          class="tw-px-3 tw-border-2 tw-border-gray-500 tw-rounded-full tw-py-2">
                          {{ group.name }}
                        </p>
                      </div>
                    </div>
                  </template>
                </Column>
                <Column field="actionButton" header="" class="tw-w-2/12">
                  <template #body="slotProps">
                    <div
                      class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end tw-py-5">
                      <NuxtLink
                        :to="`/careers/edit/${slotProps.data.careerId}`">
                        <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                      </NuxtLink>
                      <v-icon
                        color="error"
                        class="tw-cursor-pointer"
                        @click="
                          deleteCareer(
                            slotProps.data.careerId,
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
            <div class="tw-my-4">
              <v-pagination
                v-model="page"
                :length="pages"
                :total-visible="7"></v-pagination>
            </div>
          </div>
          <EmptyData
            v-else
            name="NOT HAVE ANY CAREERS"
            desc="PLEASE ADD CAREER IN CAREERS PAGE" />
        </div>
        <MessageError v-else />
      </div>
      <Loading v-else />
    </div>
  </div>
</template>
<script>
import CareerProvider from '@/resources/CareerProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      careers: [],
      CareerService: new CareerProvider(),
      page: 1,
      pages: 0,
      total: 0,
      limit: 10,
      ready: false,
      error: {
        isError: false,
        message: ''
      }
    }
  },
  watch: {
    page(newVal) {
      this.page = newVal
      this.getCareer()
    },
  },
  mounted() {
    this.getCareer()
  },
  methods: {
    getPages() {
      return Math.ceil(this.total / this.limit)
    },
    async getCareer() {
      const status = await this.CareerService.getCareer(this.page, this.limit)
      if (status.message === 'success') {
        const { data } = status
        this.careers = JSON.parse(JSON.stringify(data.careers))
        this.page = data.pagination.page
        this.total = data.pagination.total
        this.pages = this.getPages()
      } else {
        this.error.isError = true
      }
      this.ready = true
    },
    async deleteCareer(id, name) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: `คุณต้องการจะลบอาชีพ ${name}`,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'ต้องการลบ',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const status = await this.CareerService.deleteCareer(id)
          if (status.message === 'success') {
            this.getCareer()
            Swal.fire({
              icon: 'success',
              title: 'Delete Career Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Career Fail',
            })
          }
        }
      })
    },
    checkEmpty(items) {
      return !!items.length
    },
  },
}
</script>
