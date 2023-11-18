<template>
  <div>
    <HeaderBack title="Create Jobs" link="/jobs" />
    <div class="tw-my-8">
      <FormJob actionButton="Save" :idParams="idParams" />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    idParams() {
      return this.$route.params.id || ''
    },
  },
}
</script>
