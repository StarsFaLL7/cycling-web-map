<template>
  <div class="input" :class="{ 'has-icon': slots?.icon }">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      @input="(event) => emits('update:modelValue', event.target.value)"
    />
    <slot name="icon" />
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

const slots = useSlots();
</script>

<style lang="scss">
.input {
  position: relative;

  &.has-icon {
    input {
      padding-right: 34px;
    }
  }

  input {
    background: #ffffff;
    border: 1px solid #0e5979;
    border-radius: 10px;
    padding: 5px 20px;
    font-family: "Nunito";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;

    width: 100%;

    &:focus {
      outline: none;
    }
  }

  svg {
    width: 24px !important;
    height: 24px !important;

    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
  }
}
</style>
