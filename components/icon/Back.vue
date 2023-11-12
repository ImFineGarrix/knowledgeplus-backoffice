<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.8125 4.375L7.1875 10L12.8125 15.625"
      stroke="currentColor"
      stroke-width="1.875"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: () => '20px',
    },
  },
}
</script>
