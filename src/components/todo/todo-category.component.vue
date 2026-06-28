<template>
  <div class="todo-category">
    <div class="todo-category__header">
      <div>
        <BaseIcon :icon="folderIcon" size="16" />
      </div>
      <h6 class="todo-category__title">{{ folderName }}</h6>
    </div>
    <TodoCard v-for="todo in todos" v-model="todo.text"  :todo="todo"/>
  </div>
</template>

<script setup>
import TodoCard from "./todo-card.component.vue";
import BaseIcon from "../common/base-icon.component.vue";
import folderIcon from "../icons/folder.icon.vue";

const props = defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
  folderName: {
    type: String,
    default: ''
  }
});

</script>

<style lang="scss" scoped>
.todo-category {
  width: 100%;
  min-height: rem(40);
  padding: space(3) space(2);
  background-color: $neutral-surface;
  border-radius: $radius-lg;

  &__header {
    @include flex($justify: flex-start);
    gap: space(2);
  }

  &__title {
    color: $neutral-on-surface;

    font-size: rem(14);
    font-weight: normal;
  }
}
</style>
