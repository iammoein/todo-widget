<template>
  <main class="app">
    <TodoContianer />
  </main>
</template>

<script setup>
import TodoContianer from './components/todo/todo-contianer.componet.vue';

</script>

<style scoped lang="scss">
.app {
@include flex;

  min-height: 100dvh;
  width: 100%;

  background-color: $neutral-surface;
  direction: rtl;
}
</style>
