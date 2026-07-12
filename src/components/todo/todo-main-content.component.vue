<template>
  <div class="todo-main">
    <transition-group name="todo-list" tag="ul" class="todo-main__list">
      <li
        class="tood-main__single-todo"
        v-for="todo in todoStore.todoList.get(todoStore.currentCategory) || []"
        :key="todo.id"
      >
        <TodoSingle :todo="todo" />
      </li>

      <template v-if="todoStore.currentCategory === 'all'">
        <li
          class="todo-main__category-todo"
          v-for="[category, todos] in categoris"
          :key="category"
        >
          <TodoCategory
            v-if="todos.length"
            :todos="todos"
            :folder-name="todoStore.getCategoryName(category)"
          />
        </li>
      </template>
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTodoStore } from "@/stores/todo.store.js";

import TodoCategory from "./todo-category.component.vue";
import TodoSingle from "./todo-single.component.vue";

const todoStore = useTodoStore();

const categoris = computed(() =>
  [...todoStore.todoList].filter(([category]) => category !== "all"),
);
</script>

<style lang="scss" scoped>
.todo-main {
  width: rem(300);

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__list {
    @include flex(column, $align: stretch);
    gap: space(2);
  }
}

.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 300ms ease-out;
}

.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>
