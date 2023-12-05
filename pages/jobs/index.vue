<template>
  <div>
    <HeaderPage
      title="Jobs"
      link="/jobs/create"
      showBtn
      titleBtn="Create Job" />
    <div class="tw-my-8">
      <div v-if="ready">
        <v-card>
          <DataTable :value="jobs">
            <Column field="name" header="อาชีพ">
              <template #header>
                <div class="tw-py-6 tw-px-3"></div>
              </template>
              <template #body="slotProps">
                <div class="tw-px-6">{{ slotProps.data.name }}</div>
              </template>
            </Column>
            <Column field="categories" header="สายงาน">
              <template #body="slotProps">
                <div class="tw-flex tw-gap-4">
                  <div
                    v-for="(category, indexCategory) in slotProps.data
                      .categories"
                    :key="`category-${indexCategory}`">
                    <p
                      class="tw-px-3 tw-border-2 tw-border-gray-500 tw-rounded-full tw-py-2">
                      {{ category.name }}
                    </p>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="actionButton" header="" class="tw-w-2/12">
              <template #body="slotProps">
                <div
                  class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end tw-py-5">
                  <NuxtLink :to="`/jobs/edit/${slotProps.data.careerId}`">
                    <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
                  </NuxtLink>
                  <v-icon
                    color="error"
                    class="tw-cursor-pointer"
                    @click="
                      deleteJob(slotProps.data.careerId, slotProps.data.name)
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
      <Loading v-else />
    </div>
  </div>
</template>
<script>
import JobProvider from '@/resources/JobProvider'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      jobs: [],
      JobService: new JobProvider(),
      page: 1,
      pages: 0,
      total: 0,
      limit: 10,
      ready: false,
    }
  },
  watch: {
    page(newVal) {
      this.page = newVal
      this.getJob()
    },
  },
  mounted() {
    this.getJob()
  },
  methods: {
    getPages() {
      return Math.ceil(this.total / this.limit)
    },
    async getJob() {
      const status = await this.JobService.getJob(this.page, this.limit)
      if (status.message === 'success') {
        const { data } = status
        this.jobs = JSON.parse(JSON.stringify(data.careers))
        this.page = data.pagination.page
        this.total = data.pagination.total
        this.pages = this.getPages()
        this.ready = true
      }
    },
    async deleteJob(id, name) {
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
          const status = await this.JobService.deleteJob(id)
          if (status.message === 'success') {
            this.getJob()
            Swal.fire({
              icon: 'success',
              title: 'Delete Job Success',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Delete Job Fail',
              text: `${status.status}`,
            })
          }
        }
      })
    },
  },
}
</script>
