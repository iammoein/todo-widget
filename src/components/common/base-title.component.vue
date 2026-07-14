<template>
  <div class="base-title">
    <component :is="titleTag"> {{ title }}</component>
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
