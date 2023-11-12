<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.3334 5.33333H20.6667L19.3334 4H12.6667L11.3334 5.33333H6.66669V8H25.3334M8.00002 25.3333C8.00002 26.0406 8.28097 26.7189 8.78107 27.219C9.28117 27.719 9.95944 28 10.6667 28H21.3334C22.0406 28 22.7189 27.719 23.219 27.219C23.7191 26.7189 24 26.0406 24 25.3333V9.33333H8.00002V25.3333Z"
      fill="currentColor" />
  </svg>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: () => '32px',
    },
  },
}
</script>
