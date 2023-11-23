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
            <div
              v-for="(category, indexCategory) in slotProps.data.categories"
              :key="`category-${indexCategory}`">
              <p>{{ category.label }}</p>
            </div>
          </template>
        </Column>
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
      this.jobs = JSON.parse(JSON.stringify(data.data))
    },
  },
}
</script>
