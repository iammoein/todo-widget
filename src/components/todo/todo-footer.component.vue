<template>
  <div class="todo-footer">
    <button class="todo-footer__plus" @click="handleAddTodo">
      <span class="todo-footer__plus-icon">
        <BaseIcon :icon="PlusIcon" size="12" />
      </span>
    </button>
    <div class="todo-footer__progress-container">
      <div class="todo-footer__progress-bar">
        <div
          class="todo-footer__progress"
          :style="{ width: percentageCheckedTodo + '%' }"
        ></div>
      </div>
      <div class="todo-footer__percentage-container">
        <p>{{ totoalCheckedTodos }} از {{ totoalTodos }}</p>
        <p>{{ percentageCheckedTodo }}٪</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTodoStore } from "@/stores/todo.store";
import { useFocus } from "@/composables/use-focus.composable";
import { useAddTodo } from "@/composables/use-add-todo.composable";

import BaseIcon from "@/components/common/base-icon.component.vue";
import PlusIcon from "@/components/icons/plus.icon.vue";

const todoStore = useTodoStore();

const { handleAddTodo } = useAddTodo();

const totoalTodos = computed(() => {
  return todoStore.todoList.get(todoStore.currentCategory).length;
});

const totoalCheckedTodos = computed(() => {
  return todoStore.todoList
    .get(todoStore.currentCategory)
    .reduce((count, todo) => (todo.checked ? count + 1 : count), 0);
});

const percentageCheckedTodo = computed(() => {
  if (totoalTodos.value === 0) return 0;
  return Math.floor((totoalCheckedTodos.value / totoalTodos.value) * 100);
});
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

    background-color: $neutral-outline;
    border-radius: $radius-pill;
  }

  &__progress {
    width: 100%;
    height: 100%;

    background: #ffb4a8;
    background: linear-gradient(
      90deg,
      rgba(255, 180, 168, 1) 0%,
      rgba(170, 199, 255, 1) 100%
    );
    border-radius: $radius-pill;
    transition: width 500ms ease;
  }

  &__percentage-container {
    @include flex($justify: space-between);
    font-size: rem(12);
  }

  &__plus {
    @include flex;

    position: absolute;
    left: 0;
    top: -25px;

    width: rem(40);
    height: rem(40);

    background-color: $primary;
    border-radius: $radius-pill;
    border: none;

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
