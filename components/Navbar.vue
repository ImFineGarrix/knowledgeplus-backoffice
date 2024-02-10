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
      <template v-slot:append>
        <div
          @click="logout()"
          class="tw-mx-[28px] tw-border-2 tw-border-rose-700 tw-transition-all tw-duration-150 hover:tw-bg-rose-50 tw-cursor-pointer tw-rounded-lg tw-text-rose-700 tw-py-2 tw-px-2 tw-my-6 tw-flex tw-justify-between">
          <p class="tw-font-semibold">Logout</p>
          <v-icon>mdi-logout</v-icon>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { clearAuth } from '~/utils/auth'

export default {
  data() {
    return {
      menus: [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Sections',
          link: '/sections',
        },
        {
          name: 'Career Groups',
          link: '/groups',
        },
        {
          name: 'Careers',
          link: '/careers',
        },
        {
          name: 'Skills',
          link: '/skills',
        },
        {
          name: 'Organization',
          link: '/organization',
        },
        {
          name: 'Course',
          link: '/courses',
        },
        {
          name: 'Admins',
          link: '/admins',
        },
      ],
    };
  },
  methods: {
    logout () {
      clearAuth()
      this.$router.push('/login')
    }
  }
};
</script>
<style scope>
.container-menu {
  color: black !important;
  font-size: 14px !important;
  padding-left: 28px !important;
}
</style>
~/utils/auth
