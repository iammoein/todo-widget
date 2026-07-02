<template>
  <div class="todo-single">
    <div>
      <TodoCard
        :ref="(el) => register(todo.id, el)"
        @add-input="handleAddCard(todo.id)"
        @delete-input="handleDeleteByBackspace(todo.id)"
        v-model="todo.text"
        :todo="todo"
        class="todo-single__card"
      />
    </div>
    <button class="todo-single__delete" @click="handleDelete(todo.id)">
      <BaseIcon :icon="trashIcon" />
    </button>
  </div>
</template>

<script setup>
import { nextTick } from "vue";
import BaseIcon from "../common/base-icon.component.vue";
import trashIcon from "../icons/trash.icon.vue";
import TodoCard from "./todo-card.component.vue";

import { useFocus } from "@/composables/use-focus.composable.js";
import { useAddTodo } from "@/composables/use-add-todo.composable.js";
import { useTodoStore } from "@/stores/todo.store.js";

const props = defineProps({
  todo: {
    type: Object,
    default: () => ({}),
  },
});

const { register, focus } = useFocus();
const { handleAddTodo: handleAddCard } = useAddTodo();

const todoStore = useTodoStore();

const handleDeleteByBackspace = async (id) => {
  const list = todoStore.todoList.get(todoStore.currentCategory);
  const index = list.findIndex((todo) => todo.id === id);
  const focusId = list[index - 1]?.id || list[index + 1]?.id;

  list.splice(index, 1);
  await nextTick();

  focus(focusId);
};

const handleDelete = (id) => {
  todoStore.deleteTodo(id);
};
</script>

<style lang="scss" scoped>
.todo-single {
  position: relative;

  &__card {
    z-index: 2;
  }

  &__delete {
    @include button-reset;
    position: absolute;
    top: 50%;
    left: 20px;

    transform: translateY(-50%);
  }
}
</style>
