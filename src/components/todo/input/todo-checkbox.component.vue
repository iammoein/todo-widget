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
    content: "";
    display: block;
    width: rem(8);
    height: rem(8);

    background-color: $white;
    mask-image: url("@/assets/svg/checked-vector.svg");
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;

    transform: scale(1);
  }
}
</style>
