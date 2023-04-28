<template>
  <div class="textarea">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      @input="(event) => emits('update:modelValue', event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>

<style lang="scss">
.textarea {
  textarea {
    resize: none;

    border: 1px solid #0e5979;
    border-radius: 10px;

    padding: 15px 20px;
    width: 100%;
    min-height: 170px;

    &:focus {
      outline: none;
    }
  }
}
</style>
