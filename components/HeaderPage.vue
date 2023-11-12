<template>
  <div>
    <div class="tw-flex tw-justify-between">
      <p class="tw-font-bold tw-text-4xl">{{ title }}</p>
      <div class="tw-mt-1 tw-flex" v-if="showBtn">
        <NuxtLink :to="link">
          <div
            class="tw-shadow-lg tw-text-white tw-flex tw-px-10 tw-text-sm tw-rounded-md tw-py-2 tw-bg-[#79af82] hover:tw-bg-[#51b462] tw-cursor-pointer">
            <p>{{ titleBtn }}</p>
          </div>
        </NuxtLink>
      </div>
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
    titleBtn: {
      type: String,
      default: () => '',
    },
    showBtn: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>
