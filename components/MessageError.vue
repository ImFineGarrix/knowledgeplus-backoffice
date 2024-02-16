<template>
  <div class="tw-my-20">
    <img
      class="tw-w-80 tw-mx-auto"
      src="https://firebasestorage.googleapis.com/v0/b/knowledge-project-7e224.appspot.com/o/error.png?alt=media&token=744c67b1-1a35-4899-b133-1b0956fff514" />
    <div>
      <p class="text-no-data">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: () => 'Something wrong'
    }
  }
}
</script>
