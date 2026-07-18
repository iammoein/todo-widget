<template>
  <div class="todo-checked">
    <div class="todo-checked__header">
      <BaseTitle
        class="todo-checked__header-title"
        title="انجام شده"
        title-tag="h6"
      />
      <span class="todo-checked__header-line"></span>
      <button class="todo-checked__header-button" @click="handleShowList">
        <BaseIcon
          class="todo-checked__header-icon"
          :icon="isActive ? AltArrowDownIcon : AltArrowUpIcon"
          size="16"
        />
      </button>
    </div>
    <Transition name="collapse">
      <div class="todo-checked__list" v-if="isActive">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseIcon from "../common/base-icon.component.vue";
import BaseTitle from "../common/base-title.component.vue";
import AltArrowDownIcon from "../icons/alt-arrow-down.icon.vue";
import AltArrowUpIcon from "../icons/alt-arrow-up.icon.vue";

const isActive = ref(true);

const handleShowList = () => {
  isActive.value = !isActive.value;
};
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

  &__header-button {
    @include button-reset;
  }

  &__header-icon {
    color: $neutral-on-surface-variant;

    cursor: pointer;
  }
}
</style>
