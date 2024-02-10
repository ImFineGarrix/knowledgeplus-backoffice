<template>
  <div class="tw-border tw-border-black tw-rounded-lg tw-px-4 tw-py-4">
    <div v-if="editor" class="tw-space-x-2">
      <button
        class="tw-px-3 btn-tiptop tw-py-1"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }">
        <v-icon>mdi-format-bold</v-icon>
      </button>
      <button
        class="tw-px-3 btn-tiptop tw-py-1"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        <v-icon>mdi-format-italic</v-icon>
      </button>
      <button
        class="tw-px-3 btn-tiptop tw-py-1"
        @click="editor.chain().focus().unsetAllMarks().run()">
        <v-icon>mdi-format-clear</v-icon>
      </button>
    </div>
    <editor-content
      class="tw-border tw-rounded-md tw-border-black tw-my-2 tw-overflow-auto"
      :editor="editor" />
  </div>
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>
<style lang="scss" scoped>
/* Basic editor styles */
body {
  display: none;
}
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

.btn-tiptop {
  border: 1px solid rgb(0, 0, 0);
  border-radius: 0.5rem;
}
</style>
