<template>
  <div class="todo-footer">
    <button class="todo-footer__plus" @click="handleAddTodo">
      <span class="todo-footer__plus-icon">
        <BaseIcon :icon="PlusIcon" size="12" />
      </span>
    </button>
    <div class="todo-footer__progress-container">
      <progress
        class="todo-footer__progress-bar"
        value="70"
        max="100"
      ></progress>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "@/components/common/base-icon.component.vue";
import PlusIcon from "@/components/icons/plus.icon.vue";

import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();

const handleAddTodo = () => {
  todoStore.addTodo();
};
</script>

<style lang="scss" scoped>
.todo-footer {
  position: relative;
  display: flex;

  height: rem(50);

  &__progress-container {
    align-self: flex-end;
  }

  &__progress-bar {
    width: rem(299);
    height: rem(6);

    appearance: none;
    border: none;

    &::-webkit-progress-bar {
      background-color: $neutral-outline;
      border-radius: $radius-pill;
    }

    &::-webkit-progress-value {
      background: #ffb4a8;
      background: linear-gradient(
        90deg,
        rgba(255, 180, 168, 1) 0%,
        rgba(170, 199, 255, 1) 100%
      );
      border-radius: $radius-pill;
    }
  }

  &__plus {
    @include flex;

    position: absolute;
    left: 0;
    top: -20px;

    width: rem(40);
    height: rem(40);

    background-color: $primary;
    border-radius: $radius-pill;

    transition: transform 0.1s ease-out;
    cursor: pointer;

    &:active {
      transform: scale(0.88);
    }
  }

  &__plus-icon {
    @include flex;
    @include button-reset;

    color: $white;
  }
}
</style>
