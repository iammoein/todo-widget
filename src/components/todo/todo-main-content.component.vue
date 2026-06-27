<template>
  <div class="todo-main">
    <ul class="todo-main__list">
      <li
        class="tood-main__single-todo"
        v-for="todo in todoStore.todoList.get(todoStore.currentCategory) || []"
        :key="todo.id"
      >
        <TodoCard
          :ref="(el) => setCardRef(el, todo.id)"
          @add-input="handleAddCard(todo.id)"
          @delete-input="handleDeleteCard(todo.id)"
          v-model="todo.text"
        />
      </li>

      <template v-if="todoStore.currentCategory === 'all'">
        <li
          class="todo-main__category-todo"
          v-for="[category, todos] in todoStore.todoList"
          :key="category"
        >
          <TodoCard
            :folder-name="todoStore.getCategoryName(category)"
            :todo="todos"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { nextTick } from "vue";
import TodoCard from "./todo-card.component.vue";

import { useTodoStore } from "@/stores/todo.store.js";

const cardRef = new Map();

const todoStore = useTodoStore();

const setCardRef = (el, id) => {
  if (el) cardRef.set(id, el);
  else cardRef.delete(id);
};

const handleAddCard = async () => {
  todoStore.addTodo();
  await nextTick();

  const list = todoStore.todoList.get(todoStore.currentCategory);
  const newId = list.at(-1)?.id;
  
  cardRef.get(newId)?.focus();
};

const handleDeleteCard = async (id) => {
  const list = todoStore.todoList.get(todoStore.currentCategory);
  const index = list.findIndex(todo => todo.id === id);
  const focusId = list[index - 1]?.id || list[index + 1]?.id;

  list.splice(index, 1);
  cardRef.delete(id);
  await nextTick();

  cardRef.get(focusId)?.focus();
};

</script>

<style lang="scss" scoped>
.todo-main {
  width: rem(300);

  &__list {
    @include flex(column, $align: stretch);
    gap: space(2);

    list-style: none;
  }
}
</style>
