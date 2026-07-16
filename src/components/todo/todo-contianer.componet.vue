<template>
  <main class="todo-container">
    <div
      class="todo-container__content"
      :class="{ 'todo-container__content--overlay': todoStore.isSetting }"
    >
      <TodoHeader class="todo-container__header" />
      <TodoMain class="todo-container__main" />
      <TodoFooter class="todo-container__footer" />
    </div>
    <div
      class="todo-container__setting"
      :class="{ 'todo-container__setting--active': todoStore.isSetting }"
      v-show="todoStore.isSetting"
    >
      <TodoSettings />
    </div>
  </main>
</template>

<script setup>
import { useTodoStore } from "@/stores/todo.store.js";
import TodoFooter from "./todo-footer.component.vue";
import TodoHeader from "./todo-header.component.vue";
import TodoMain from "./todo-main-content.component.vue";
import TodoSettings from "./todo-settings.component.vue";

const todoStore = useTodoStore();
</script>

<style lang="scss" scoped>
.todo-container {
  position: relative;

  width: rem(332);
  height: rem(560);

  background-color: $white;
  border-radius: $radius-3xl;

  overflow: hidden;

  &__setting,
  &__content {
    padding: space(5) space(4);
  }

  &__content {
    @include flex(column);
    gap: rem(20);
    position: absolute;
    inset: 0;

    z-index: 1;

    // &:has(todo-container__content--overlay) {
    //   background-color: red;
    // }

    &--overlay {
      background-color: $state-layer;
    }
  }

  &__setting {
    position: absolute;
    inset: 0;

    height: 95%;

    background-color: $hue-10;
    border-radius: $radius-3xl;

    transform: translateY(100%);
    transition: transform 0.3s ease;

    z-index: 2;

    &--active {
      transform: translateY(5%);
    }
  }

  &__header,
  &__footer {
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
