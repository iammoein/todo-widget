<template>
  <div class="todo-card">
    <div class="todo-card__content">
        <TodoCheckbox @checked="toggleCheckCard(todo.id)" v-model="todo.checked" />
        <TodoInput
          ref="inputRef"
          @enter="handleAddCard"
          @delete="handleDeleteCard"
          v-model="model"
          :checked="todo.checked"
        />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TodoInput from "./todo-input.component.vue";
import TodoCheckbox from "./todo-checkbox.component.vue";
import { useTodoStore } from "@/stores/todo.store.js";

const model = defineModel();

const props = defineProps({
  todo: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
});

const inputRef = ref("");

const todoStore = useTodoStore();

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
});

const emit = defineEmits(["add-input", "delete-input", "checked-card"]);

const handleAddCard = () => {
  emit("add-input");
};

const handleDeleteCard = () => {
  emit("delete-input");
};

const toggleCheckCard = (id) => {
  todoStore.toggleCheckedTodo(id);
};
</script>

<style lang="scss" scoped>
.todo-card {
  width: 100%;
  min-height: rem(40);
  padding: space(3) space(2);

  background-color: $neutral-surface;
  border-radius: $radius-lg;

  &__content {
    @include flex($justify: flex-start);
    gap: space(2);

    position: relative;
  }
}
</style>
