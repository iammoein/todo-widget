<template>
  <div class="todo-card">
    <div class="todo-card__folder" v-if="folderName.length">
      <div>
        <BaseIcon :icon="folderIcon" size="16" />
      </div>
      <h6 class="todo-card__folder-title">{{ folderName }}</h6>
    </div>
    <div class="todo-card__content">
      <TodoCheckbox @checked="toggleCheckCard" />
      <TodoInput
        ref="inputRef"
        @enter="handleAddCard"
        @delete="handleDeleteCard"
        v-model="model"
        :checked="checkedCard"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TodoInput from "./todo-input.component.vue";
import TodoCheckbox from "./todo-checkbox.component.vue";
import BaseIcon from "../common/base-icon.component.vue";
import folderIcon from "../icons/folder.icon.vue";

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
  folderName: {
    type: String,
    default: "",
  },
});

const checkedCard = ref(false);
const inputRef = ref("");

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

const toggleCheckCard = () => {
  checkedCard.value = !checkedCard.value;
};
</script>

<style lang="scss" scoped>
.todo-card {
  width: 100%;
  min-height: rem(40);
  padding: space(3) space(2);

  background-color: $neutral-surface;
  border-radius: $radius-lg;

  &__folder {
    @include flex($justify: flex-start);
    gap: space(2);
  }

  &__folder-title {
    color: $neutral-on-surface;

    font-size: rem(14);
    font-weight:normal;
  }

  &__content {
    @include flex($justify: flex-start);
    gap: space(2);

    position: relative;
  }
}
</style>
