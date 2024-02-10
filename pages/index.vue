<template>
  <div>
    <h1 class="tw-text-3xl tw-font-bold tw-underline">Home</h1>
    <p>NODE_ENV: {{ config.public.nodeEnv }}</p>
  </div>
</template>
<script>
import { useRuntimeConfig } from "nuxt/app";
export default {
  data () {
    return {
      config: useRuntimeConfig()
    }
  }
}
</script>
