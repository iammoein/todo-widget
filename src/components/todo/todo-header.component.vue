<template>
  <div class="todo-header">
    <div class="todo-header__title">
      <h4 class="todo-header__heading">کارهای من</h4>
      <button class="todo-header__setting-icon" @click="handleClickSetting">
        <BaseIcon :icon="SettingsIcon" size="18" />
      </button>
    </div>
    <div class="todo-header__categories">
      <ul class="todo-header__category-list">
        <li v-for="category in todoStore.categoryList" :key="category.id">
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
      </ul>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "@/components/common/base-icon.component.vue";
import SettingsIcon from "@/components/icons/settings.icon.vue";

import { useTodoStore } from "@/stores/todo.store";

const todoStore = useTodoStore();

const isActiveCategory = (categoryId) =>
  categoryId === todoStore.currentCategory;

const handleCategory = (id) => {
  todoStore.selectCategory(id);
};

const handleClickSetting = () => {
  todoStore.isSetting = true;
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

  &__setting-icon {
    @include button-reset;
  }
}
</style>
