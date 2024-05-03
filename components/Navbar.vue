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
            <NuxtLink :to="menu.path" class="tw-flex">
              <span class="mx-1">{{ menu.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </v-list>
      <template v-slot:append>
        <div
          class="tw-mx-[20px] tw-py-2  tw-my-6 tw-flex tw-justify-between tw-items-center tw-space-x-2">
          <div>
            <div
              class="tw-flex tw-font-semibold tw-text-lg tw-truncate tw-w-32">
              {{ removeAfterAddress(user.email) }}
            </div>
            <p class="tw-text-xs">
              Role: <span class="tw-uppercase">{{ user.role }}</span>
            </p>
          </div>
          <v-icon color="error" @click="logout()">mdi-logout</v-icon>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { clearAuth, getAuthDecode } from '~/utils/Auth'

export default {
  data() {
    return {
      user: {
        email: '',
        role: ''
      },
      menus: [
        {
          name: 'Home',
          role: 'All',
          path: '/',
        },
        {
          name: 'Sections',
          role: 'All',
          path: '/sections',
        },
        {
          name: 'Career Groups',
          role: 'All',
          path: '/groups',
        },
        {
          name: 'Careers',
          role: 'All',
          path: '/careers',
        },
        {
          name: 'Skills',
          role: 'All',
          path: '/skills',
        },
        {
          name: 'Organizations',
          role: 'All',
          path: '/organizations',
        },
        {
          name: 'Course',
          role: 'All',
          path: '/courses',
        },
        {
          name: 'Admins',
          role: 'Owner',
          path: '/admins',
        },
      ],
    };
  },
  mounted () {
    this.getAuth()
  },
  methods: {
    getAuth () {
      const data = getAuthDecode()
      if (data) {
        this.user = data
        if (data.role !== 'owner') {
          this.menus = this.menus.filter((menu) => menu.role === 'All')
        }
      }
    },
    removeAfterAddress (email) {
      if (email) {
        return email.split('@')[0]
      }
      return ''
    },
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
