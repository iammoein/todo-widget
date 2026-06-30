<template>
  <div class="todo-main">
    <ul class="todo-main__list">
      <li
        class="tood-main__single-todo"
        v-for="todo in todoStore.todoList.get(todoStore.currentCategory) || []"
        :key="todo.id"
      >
        <TodoCard
          :ref="(el) => register(todo.id, el)"
          @add-input="handleAddCard(todo.id)"
          @delete-input="handleDeleteCard(todo.id)"
          v-model="todo.text"
          :todo="todo"
        />
      </li>

      <template v-if="todoStore.currentCategory === 'all'">
        <li
          class="todo-main__category-todo"
          v-for="[category, todos] in categoris"
          :key="category"
        >
          <TodoCategory
            :todos="todos"
            :folder-name="todoStore.getCategoryName(category)"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { computed, nextTick } from "vue";
import { useTodoStore } from "@/stores/todo.store.js";
import TodoCard from "./todo-card.component.vue";

import TodoCategory from "./todo-category.component.vue";
import { useFocus } from "@/composables/use-focus.composable.js";

const todoStore = useTodoStore();

const categoris = computed(() =>
  [...todoStore.todoList].filter(([category]) => category !== "all"),
);

const { register, focus, focusLastItem } = useFocus();

const handleAddCard = async () => {
  if (todoStore.checkTodoEmptyItem > 1) return;
  todoStore.addTodo();

  const list = todoStore.todoList.get(todoStore.currentCategory);

  await focusLastItem(list);
};

const handleDeleteCard = async (id) => {
  const list = todoStore.todoList.get(todoStore.currentCategory);
  const index = list.findIndex((todo) => todo.id === id);
  const focusId = list[index - 1]?.id || list[index + 1]?.id;

  list.splice(index, 1);
  await nextTick();

  focus(focusId);
};
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

    list-style: none;
  }
}
</style>
