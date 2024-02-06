<template>
  <div>
    <HeaderPage
      title="Admins"
      link="/admins/create"
      showBtn
      titleBtn="Create Admin" />
    <div class="tw-my-8">
      <v-card></v-card>
      <div class="tw-my-4">
        <v-pagination :length="10" :total-visible="7"></v-pagination>
      </div>
    </div>
  </div>
</template>
