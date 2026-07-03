<template>
  <div
    class="todo-card"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    :class="{ 'todo-card--swiping': swipeObj.isSwiping }"
  >
    <div class="todo-card__content">
      <TodoCheckbox
        @checked="toggleCheckCard(todo.id)"
        v-model="todo.checked"
      />
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
import { computed, ref } from "vue";
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
  swipeObj: {
    type: Object,
    default: { x: 0, isSwiping: false },
  },
});

const inputRef = ref("");

const todoStore = useTodoStore();

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
});

const emit = defineEmits([
  "add-input",
  "delete-input",
  "checked-card",
  "pointer-down",
  "pointer-move",
  "pointer-up",
]);

const handleAddCard = () => {
  emit("add-input");
};

const handleDeleteCard = () => {
  emit("delete-input");
};

const handlePointerDown = (el) => {
  emit("pointer-down", el);
};

const handlePointerMove = (el) => {
  emit("pointer-move", el);
};

const handlePointerUp = () => {
  emit("pointer-up");
};

const toggleCheckCard = (id) => {
  todoStore.toggleCheckedTodo(id);
};

const translateXValue = computed(() => `translateX(${props.swipeObj.x}px)`);
</script>

<style lang="scss" scoped>
.todo-card {
  position: relative;

  width: 100%;
  min-height: rem(40);
  padding: space(3) space(2);

  background-color: $neutral-surface;
  border-radius: $radius-lg;

  user-select: none;
  cursor: grab;

  &__content {
    @include flex($justify: flex-start);
    gap: space(2);

    position: relative;
  }
  transform: v-bind(translateXValue);

  &--swiping {
    cursor: grabbing;
  }
}
</style>
