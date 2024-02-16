<template>
  <div>
    <div class="tw-bg-neutral-700 tw-h-[100vh]">
      <div
        class="tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%]">
        <div class=" tw-bg-white tw-rounded-lg">
          <div class="tw-px-10 tw-py-12 tw-space-y-2">
            <IconLogo class="tw-w-80" />
          </div>
          <div class="tw-px-10 tw-space-y-5 tw-pb-20 tw-pt-6">
            <v-text-field
              v-model="form.email"
              :rules="[rules.ruleEmail, rules.ruleRequired]"
              prepend-inner-icon="mdi-account-box-outline"
              label="Email"
              placeholder="yours@example.com"
              variant="outlined"></v-text-field>
            <v-text-field
              v-model="form.password"
              :rules="[rules.ruleRequired]"
              prepend-inner-icon="mdi-lock-outline"
              label="Password"
              type="password"
              placeholder="your password"
              variant="outlined"></v-text-field>
          </div>
          <div class="tw-bg-rose-800 tw-py-6 tw-rounded-b-lg">
            <div
              @click="login()"
              class="font-poppin tw-cursor-pointer tw-text-center tw-text-white tw-text-lg hover:tw-scale-110 tw-transition-all tw-duration-150 tw-font-semibold">
              LOCK IN >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="bg-loading">
      <Loading />
    </div>
  </div>
</template>
<script>
import AuthProvider from '~/resources/AuthProvider'
import { clearAuth, setAuthUser } from '~/utils/Auth'
import Swal from 'sweetalert2'

definePageMeta({
  layout: 'empty',
})

export default {
  data () {
    return {
      AuthService: new AuthProvider(),
      form: {
        email: '',
        password: ''
      },
      loading: false,
      rules: useFormRules()
    }
  },
  mounted () {
    clearAuth()
  },
  methods: {
    async login () {
      this.loading = true
      const status = await this.AuthService.login(this.form)
      if (status.message === 'success') {
        const auth = setAuthUser(status.data?.accessToken || '')
        if (auth) {
          Swal.fire({
            icon: 'success',
            title: 'Welcome to Knowledge+ Backoffice'
          }).then(() => {
            this.$router.push('/')
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Email or Password is incorrect',
          })
          this.loading = false
        }
        this.loading = false
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Email or Password is incorrect',
        })
        this.loading = false
      }
    }
  }
}
</script>
