<template>
  <textarea
    v-model="model"
    rows="1"
    ref="textareaRef"
    type="text"
    class="todo-input"
    :class="{ 'todo-input--checked': checked }"
    @input="autoResize"
    @keydown.enter.prevent="onEnter"
    @keydown.delete="onDelete"
    :disabled="checked"
  >
  </textarea>
</template>

<script setup>
import { useTodoStore } from "@/stores/todo.store";
import { computed, ref } from "vue";

const { checked } = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});

defineExpose({
  focus() {
    textareaRef.value?.focus();
  },
});
const emit = defineEmits(["enter", "delete"]);
const model = defineModel({
  type: String,
  default: "",
});

const todoStore = useTodoStore();
const textareaRef = ref(null);

const onEnter = () => {
  emit("enter");
};

const fontSizeMap = { small: "12px", medium: "14px", large: "18px" };

const fontSize = computed(() => fontSizeMap[todoStore.settings.fontSize]);

const onDelete = (el) => {
  if (!model.value.trim()) {
    el.preventDefault();
    el.stopPropagation();
    emit("delete");
  }
};

const autoResize = () => {
  const el = textareaRef.value;
  if (!el) return;

  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};
</script>

<style scoped lang="scss">
.todo-input {
  flex-shrink: 1;

  width: 100%;
  min-height: rem(18);
  padding-inline: space(7);

  background-color: transparent;
  border: none;
  outline: none;
  resize: none;

  font-size: v-bind(fontSize);

  overflow: hidden;

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  transition: color 0.2s ease-in;

  &--checked {
    text-decoration: line-through;
    color: $neutral-on-surface-variant;
  }
}
</style>
