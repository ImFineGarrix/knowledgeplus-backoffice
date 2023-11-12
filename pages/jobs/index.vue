<template>
  <div>
    <HeaderPage
      title="Jobs"
      link="/jobs/create"
      showBtn
      titleBtn="Create Job" />
    <div class="tw-my-8">
      <DataTable>
        <Column field="name" header="อาชีพ"></Column>
        <Column field="categories" header="สายงาน"></Column>
        <Column field="skills" header="ทักษะในอาชีพ"></Column>
      </DataTable>
    </div>
  </div>
</template>
