<template>
  <input class="todo-checkbox" type="checkbox" v-model="model" />
</template>

<script setup>
const model = defineModel({
  type: Boolean,
  default: false,
});
</script>

<style lang="scss" scoped>
.todo-checkbox {
  position: absolute;
  top: 50%;
  right: rem(5);
  transform: translateY(-50%);

  width: rem(16);
  height: rem(16);

  background-color: transparent;
  border-radius: $radius-sm;
  border: 2px solid $neutral-outline;

  cursor: pointer;
  appearance: none;

  &:checked {
    @include flex;

    background-color: $primary;
    border: none;
  }

  &:checked::after {
    content: "✓";

    color: $white;

    font-weight: 600;
    font-size: rem(12);

    transform: scale(1);
  }
}
</style>
