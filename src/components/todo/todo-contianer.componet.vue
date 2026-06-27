<template>
  <div class="todo-container">
    <TodoHeader class="todo-container__header" />
    <TodoMain class="todo-container__main" />
    <TodoFooter class="todo-container__footer" />
  </div>
</template>

<script setup>
import TodoFooter from "./todo-footer.component.vue";
import TodoHeader from "./todo-header.component.vue";
import TodoMain from "./todo-main-content.component.vue";
</script>

<style lang="scss" scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  gap: rem(20);

  width: rem(332);
  height: rem(560);
  padding: space(5) space(4);

  &__header,
  &__footer {
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    overflow-y: auto;
  }

  background-color: $white;
  border-radius: $radius-3xl;
}
</style>
