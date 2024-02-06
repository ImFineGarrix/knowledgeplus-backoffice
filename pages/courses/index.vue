<template>
  <div>
    <HeaderPage
      title="Courses"
      link="/courses/create"
      showBtn
      titleBtn="Create Course" />
    <div class="tw-my-8">
      <v-card> </v-card>
      <div class="tw-my-4">
        <v-pagination :length="10" :total-visible="7"></v-pagination>
      </div>
    </div>
  </div>
</template>
