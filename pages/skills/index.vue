<template>
  <div>
    <HeaderPage
      title="Skills"
      link="/skills/create"
      showBtn
      titleBtn="Create Skill" />
    <div class="tw-my-8">
      <DataTable>
        <Column field="skills" header=""></Column>
        <Column field="name" header="ทักษะ"></Column>
        <Column field="categories" header="Level"></Column>
      </DataTable>
    </div>
  </div>
</template>
