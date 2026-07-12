<template>
  <div class="todo-header">
    <div class="todo-header__title">
      <h4 class="todo-header__heading">کارهای من</h4>
      <button class="todo-header__setting-icon">
        <BaseIcon :icon="SettingsIcon" size="18" />
      </button>
    </div>
    <div class="todo-header__categories">
      <ul class="todo-header__category-list">
        <li v-for="category in todoStore.categoryList">
          <button
            :class="{
              'todo-header__category--active': isActiveCategory(category.id),
            }"
            class="todo-header__category"
            :style="{
              background: category.color.bg,
              color: category.color.text,
              '--category-border': category.color.text,
            }"
            @click="handleCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </li>

        <li v-if="isAdding">
          <input
            v-model="categoryName"
            type="text"
            class="todo-header__category todo-header__category-new"
            @blur="handleConfirmCategory"
            @keyup.enter="handleConfirmCategory"
            @keyup.esc="handleCancelCategory"
            ref="inputRef"
          />
        </li>
        <li v-else>
          <button
            @click="handleAddCategory"
            class="todo-header__category todo-header__plus"
          >
            <span class="todo-header__plus-text">
              <BaseIcon :icon="PlusIcon" size="8" />
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";

import BaseIcon from "@/components/common/base-icon.component.vue";
import PlusIcon from "@/components/icons/plus.icon.vue";
import SettingsIcon from "@/components/icons/settings.icon.vue";

import { useTodoStore } from "@/stores/todo.store";

const categoryName = defineModel({
  type: String,
  default: "",
});

const isAdding = ref(false);
const inputRef = ref(null);

const todoStore = useTodoStore();

const isActiveCategory = (categoryId) =>
  categoryId === todoStore.currentCategory;

const handleAddCategory = async() => {
  isAdding.value = true;
  await nextTick();
  inputRef.value?.focus();
};

const handleConfirmCategory = () => {
  if (categoryName.value.trim()) {
    todoStore.addCategory(categoryName.value);
  }
  categoryName.value = "";
  isAdding.value = false;
};

const handleCancelCategory = () => {
  isAdding.value = false;
  categoryName.value = "";
};

const handleCategory = (id) => {
  todoStore.selectCategory(id);
};
</script>

<style lang="scss" scoped>
.todo-header {
  @include flex(column);
  gap: space(4);

  width: rem(300);
  height: rem(70);

  &__title {
    @include flex($justify: space-between);

    width: 100%;
  }

  &__heading {
    font-size: rem(16);
    font-weight: 400;
  }

  &__icon {
    cursor: pointer;
  }

  &__categories {
    @include flex($justify: flex-start);
    gap: space(2);

    width: 100%;

    overflow-x: auto;
    overflow-y: hidden;

    white-space: nowrap;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__category {
    @include button-reset;

    height: rem(24);
    min-width: rem(35);
    padding: space(0.5) space(3);

    border: 1px solid transparent;
    border-radius: space(17);

    font-size: rem(12);
    font-weight: 400;

    cursor: pointer;

    &--active {
      border-color: var(--category-border);
    }
  }

  &__category-list {
    display: flex;
    gap: space(2);

    height: rem(24);
  }

  &__category-new {
    field-sizing: content;

    border: 1px solid $neutral-on-surface;
    outline: none;
    cursor: text;
  }

  &__plus {
    @include flex;

    width: rem(24);
    height: rem(24);

    background-color: $neutral-surface;
    border-radius: $radius-pill;
    border-color: transparent;
    color: $neutral-on-surface-variant;
  }

  &__plus-text {
    @include flex;

    color: $neutral-on-surface-variant;
  }

  &__setting-icon {
    @include button-reset;
  }
}
</style>
