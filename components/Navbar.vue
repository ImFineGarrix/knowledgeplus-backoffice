<template>
  <div>
    <v-navigation-drawer permanent width="200">
      <template v-slot:prepend>
        <div class="tw-flex tw-justify-center tw-items-center tw-mt-10 tw-mb-1">
          <IconLogo class="tw-w-36" />
        </div>
      </template>
      <v-list class="tw-flex-col container-menu tw-overflow-auto">
        <div v-for="(menu, indexMenu) in menus" :key="`menu-${indexMenu}`">
          <div class="tw-my-4 tw-font-semibold text-capitalize tw-flex">
            <NuxtLink :to="menu.link" class="tw-flex">
              <span class="mx-1">{{ menu.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Categories',
          link: '/categories',
        },
        {
          name: 'Jobs',
          link: '/jobs',
        },
        {
          name: 'Skills',
          link: '/skills',
        },
        {
          name: 'Course',
          link: '/courses',
        },
        {
          name: 'Admin',
          link: '/admins',
        },
      ],
    }
  },
}
</script>
<style scope>
.container-menu {
  color: black !important;
  font-size: 14px !important;
  padding-left: 28px !important;
}
</style>
