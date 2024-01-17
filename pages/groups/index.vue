<template>
  <div>
    <HeaderPage
      title="Groups"
      link="/groups/create"
      showBtn
      titleBtn="Create Groups" />
    <div class="tw-my-8">
      <v-card> </v-card>
      <div class="tw-my-4">
        <v-pagination :length="10" :total-visible="7"></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
