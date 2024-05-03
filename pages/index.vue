<template>
  <div>
    <div class="tw-my-20">
      <img
        class="tw-w-80 tw-mx-auto"
        src="https://firebasestorage.googleapis.com/v0/b/knowledge-project-7e224.appspot.com/o/homepage-backoffice.png?alt=media&token=7ef81dc7-b349-495a-bd47-63a69d113e09" />
      <div class="tw-space-y-1">
        <p class="tw-text-center tw-text-2xl tw-font-semibold">
          {{ removeAfterAddress(user.email) }}
        </p>
        <p class="tw-text-center tw-text-base">
          Role: <span class="tw-uppercase">{{ user.role }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useRuntimeConfig } from "nuxt/app";
import { getAuthDecode } from '~/utils/Auth'

export default {
  data () {
    return {
      user: {
        email: '',
        role: ''
      },
      config: useRuntimeConfig()
    }
  },
  mounted () {
    this.getAuth()
  },
  methods: {
    getAuth () {
      const data = getAuthDecode()
      if (data) {
        this.user = data
      }
    },
    removeAfterAddress (email) {
      if (email) {
        return email.split('@')[0]
      }
      return ''
    },
  }
}
</script>
