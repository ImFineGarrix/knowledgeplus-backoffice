<template>
  <div>
    <HeaderPage
      title="Categories"
      showBtn
      titleBtn="Create Category"
      link="/categories/create" />
    <div class="tw-my-8">
      <DataTable>
        <Column field="image" header=""></Column>
        <Column field="name" header="สายงาน"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
