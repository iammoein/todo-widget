<template>
  <component :is="icon" :style="iconStyle" class="base-icon" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})

const iconStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
}))
</script>

<style lang="scss">
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>