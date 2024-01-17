<template>
  <div>
    <HeaderPage
      title="Organization"
      link="/organization/create"
      showBtn
      titleBtn="Create Organization" />
    <div class="tw-my-8">
      <v-card>
        <DataTable :value="organizations">
          <Column field="image" header=""
            ><template #header> <div class="tw-py-5"></div> </template
          ></Column>
          <Column field="name" header="ชื่อ"></Column>
        </DataTable>
      </v-card>
      <div class="tw-my-4">
        <v-pagination :length="10" :total-visible="7"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      organizations: [
        {
          name: '1',
        },
      ],
    }
  },
}
</script>
