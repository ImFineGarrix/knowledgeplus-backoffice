<template>
  <div v-show="dialog" width="auto" class="preview-modal">
    <v-card class="preview-image-card">
      <div class="preview-image-box">
        <img
          :src="img"
          :class="activeClass ? 'preview-image-skill' : 'preview-image'"
          alt="preview-image" />
      </div>
      <v-btn
        class="preview-image-close"
        elevation="5"
        icon
        @click="closeDialog()">
        <v-icon color="black"> mdi-close </v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
    img: {
      type: String,
      default: () => null,
    },
    isSkill: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    dialog() {
      return this.status
    },
    activeClass() {
      return this.isSkill
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update-status', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.preview-image-card {
  position: relative;
  img.preview-image {
    height: 70vh;
    width: auto;
    object-fit: contain;
    background-color: white;
  }
  img.preview-image-skill {
    height: 60vh;
    width: auto;
    object-fit: contain;
    padding: 40px;
  }
  .preview-image-close {
    position: absolute;
    background-color: white;
    top: 10px;
    right: 10px;
  }
}

.preview-modal {
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
