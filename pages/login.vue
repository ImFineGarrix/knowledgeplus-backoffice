<template>
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
          <p
            class="font-poppin tw-cursor-pointer tw-text-center tw-text-white tw-text-lg hover:tw-scale-110 tw-transition-all tw-duration-150 tw-font-semibold">
            LOCK IN >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
definePageMeta({
  layout: 'empty',
})

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: useFormRules()
    }
  },
  methods: {

  }
}
</script>
