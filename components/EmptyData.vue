<template>
  <div class="tw-my-28">
    <img
      class="tw-w-48 tw-mx-auto"
      src="https://firebasestorage.googleapis.com/v0/b/knowledge-project-7e224.appspot.com/o/turn-off.png?alt=media&token=3b1ca41c-1ad9-4096-bbf4-840f5586cc13" />
    <div>
      <p class="text-no-data tw-mt-4">{{ name }}</p>
      <p class="text-please-add-data">{{ desc }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: () => '',
    },
    desc: {
      type: String,
      default: () => '',
    },
  },
}
</script>
