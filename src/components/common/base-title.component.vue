<template>
  <div class="base-title">
    <component :is="titleTag" class="base-title__heading">
      {{ title }}</component
    >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  titleTag: {
    type: String,
    default: "h3",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.base-title {
  &__heading {
    font-size: var(--base-title-font-size, inherit);
    font-weight: var(--base-title-font-weight, inherit);
  }
}
</style>
