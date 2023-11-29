<template>
  <div>
    <HeaderPage
      title="Jobs"
      link="/jobs/create"
      showBtn
      titleBtn="Create Job" />
    <div class="tw-my-8">
      <DataTable :value="jobs">
        <Column field="name" header="อาชีพ"></Column>
        <Column field="categories" header="สายงาน">
          <template #body="slotProps">
            <div class="tw-flex tw-gap-4">
              <div
                v-for="(category, indexCategory) in slotProps.data.categories"
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
            <div class="tw-space-x-4 tw-mr-4 tw-flex tw-justify-end">
              <NuxtLink :to="`/jobs/edit/${slotProps.data.careerId}`">
                <v-icon class="tw-cursor-pointer">mdi-pencil</v-icon>
              </NuxtLink>
              <v-icon
                class="tw-cursor-pointer tw-text-rose-600"
                @click="deleteJob(slotProps.data.careerId, slotProps.data.name)"
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
import JobProvider from '@/resources/JobProvider'

export default {
  data() {
    return {
      jobs: [],
      JobService: new JobProvider(),
    }
  },
  mounted() {
    this.getJob()
  },
  methods: {
    async getJob() {
      const data = await this.JobService.getJob()
      if (data.message === 'success') {
        this.jobs = JSON.parse(JSON.stringify(data.data))
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
