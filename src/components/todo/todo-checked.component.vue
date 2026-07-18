<template>
  <div class="todo-checked">
    <div class="todo-checked__header">
      <BaseTitle
        class="todo-checked__header-title"
        title="انجام شده"
        title-tag="h6"
      />
      <span class="todo-checked__header-line"></span>
      <BaseIcon
        class="todo-checked__header-icon"
        :icon="AltArrowUpIcon"
        size="16"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import BaseIcon from "../common/base-icon.component.vue";
import BaseTitle from "../common/base-title.component.vue";
import AltArrowUpIcon from "../icons/alt-arrow-up.icon.vue";
</script>

<style scoped lang="scss">
.todo-checked {
  &__header {
    @include flex;
    gap: space(2);

    margin-block: space(5);
  }

  &__header-title {
    font-weight: 400;
    font-size: rem(12);
  }

  &__header-line {
    flex: 1;

    height: 1px;

    background-color: $neutral-outline;
  }

  &__header-icon {
    color: $neutral-on-surface-variant;

    cursor: pointer;
  }
}
</style>
