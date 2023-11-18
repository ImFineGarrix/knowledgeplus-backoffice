<template>
  <div>
    <HeaderBack title="Create Skill" link="/skills" />
    <div class="tw-my-8">
      <FormSkill actionButton="Save" :idParams="idParams" />
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
