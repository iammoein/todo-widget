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
import { computed, reactive, ref } from "vue";
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

const swipeObj = reactive({
  startX: 0,
  x: 0,
  isSwiping: false,
});

const THERSHOLD = 60;

const toggleCheckCard = (id) => {
  todoStore.toggleCheckedTodo(id);
};

const handlePointerDown = (el) => {
  swipeObj.isSwiping = true;
  swipeObj.startX = el.clientX - swipeObj.x;
  el.target.setPointerCapture(el.pointerId);
};

const handlePointerMove = (el) => {
  if (!swipeObj.isSwiping) return;

  const delta = el.clientX - swipeObj.startX;
  swipeObj.x = Math.min(Math.max(delta, 0), THERSHOLD);
};

const handlePointerUp = () => {
  swipeObj.isSwiping = false;
};

const translateXValue = computed(() => `translateX(${swipeObj.x}px)`);
</script>

<style lang="scss" scoped>
.todo-card {
  position: relative;

  width: 100%;
  min-height: rem(40);
  padding: space(3) space(2);

  background-color: $neutral-surface;
  border-radius: $radius-lg;

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
