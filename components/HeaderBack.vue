<template>
  <div>
    <div class="tw-font-bold tw-text-4xl tw-flex tw-space-x-4">
      <div class="tw-flex tw-justify-center tw-items-center">
        <NuxtLink :to="link">
          <IconBack width="40px" />
        </NuxtLink>
      </div>
      <p>{{ title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => '',
    },
    link: {
      type: String,
      default: () => '/',
    },
  },
}
</script>
