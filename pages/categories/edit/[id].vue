<template>
  <div>
    <HeaderBack title="Edit Category" link="/categories" />
    <div class="tw-my-8">
      <FormCategory actionButton="Save" :idParams="idParams" />
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
