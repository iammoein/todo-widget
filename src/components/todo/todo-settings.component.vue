<template>
  <main class="todo-settings">
    <h5>تنظیمات ویجت</h5>
    <div class="todo-settings__section">
      <div class="todo-settings__section-header">
        <h6 class="todo-settings__header-title">دسته بندی ها</h6>
        <p class="todo-settings__header-content">
          میتونی دسته‌بندی دلخواهت رو ایجاد یا حذف کنی
        </p>
      </div>

      <ul class="todo-settings__categories-list todo-settings__section-content">
        <li
          v-for="category in filteredCategory"
          class="todo-settings__categories-item"
          :key="category.id"
        >
          <button class="todo-settings__delete-button">
            <BaseIcon
              class="todo-settings__delete-icon"
              size="5"
              :icon="DeleteIcon"
            />
          </button>
          <button class="todo-settings__category-name">
            {{ category.name }}
          </button>
        </li>

        <li v-if="isAdding">
          <input
            v-model="categoryName"
            type="text"
            class="todo-settings__categories-item todo-settings__category-new"
            @blur="handleConfirmCategory"
            @keyup.enter="handleConfirmCategory"
            @keyup.esc="handleCancelCategory"
            ref="inputRef"
          />
        </li>
        <li v-else>
          <button
            @click="handleAddCategory"
            class="todo-settings__categories-item todo-settings__plus"
          >
            <span class="todo-settings__plus-text">
              <BaseIcon :icon="PlusIcon" size="8" />
            </span>
          </button>
        </li>
      </ul>
    </div>

    <div class="todo-settings__section">
      <div class="todo-settings__section-header">
        <h6 class="todo-settings__header-title">رنگ دسته بندی</h6>
        <p class="todo-settings__header-content">
          با انتخاب هر دسته بندی میتونی رنگش رو عوض کنی
        </p>
      </div>

      <div class="todo-settings__pick-color">
        <ul
          class="todo-settings__categories-list todo-settings__section-content"
        >
          <li v-for="category in filteredCategory" :key="category.id">
            <button
              :style="{
                color: category.color.text,
                background: category.color.bg,
                '--category-border': category.color.text,
              }"
              @click="handleSelectCategory(category)"
              class="todo-settings__categories-item"
              :class="{
                'todo-settings__categories-item--active': isActiveCategory(
                  category.id,
                ),
              }"
            >
              {{ category.name }}
            </button>
          </li>
        </ul>
        <ul class="todo-settings__color-list">
          <li v-for="color in CATEGORY_COLORS" :key="color.bg">
            <button
              class="todo-settings__color"
              :style="{ background: color.bg }"
              @click="handleChangeColor(color)"
            >
              <BaseIcon
                v-if="activeColor === color.bg"
                size="8"
                :icon="CheckIcon"
                class="todo-settings__check-icon"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useTodoStore } from "@/stores/todo.store";
import { computed, nextTick, ref } from "vue";
import { CATEGORY_COLORS } from "@/constants/category-colors.constant.js";

import DeleteIcon from "../icons/delete.icon.vue";
import PlusIcon from "@/components/icons/plus.icon.vue";
import BaseIcon from "../common/base-icon.component.vue";
import CheckIcon from "../icons/check.icon.vue";

const categoryName = defineModel({
  type: String,
  default: "",
});

const editingCategory = ref(null);

const isAdding = ref(false);
const inputRef = ref(null);
const activeColor = ref(null);

const todoStore = useTodoStore();

const filteredCategory = computed(() =>
  todoStore.categoryList.filter((category) => category.id !== "all"),
);

const handleSelectCategory = (category) => {
  editingCategory.value = category;
  activeColor.value = category.color.bg;
};

const handleChangeColor = (color) => {
  if (editingCategory.value) {
    todoStore.updateCategoryColor(editingCategory.value.id, color);
    activeColor.value = color.bg;
  }
};

const isActiveCategory = (categoryId) =>
  categoryId === editingCategory.value?.id;

const handleAddCategory = async () => {
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
</script>

<style lang="scss" scoped>
.todo-settings {
  @include flex($direction: column, $align: flex-start);
  gap: space(6);

  width: rem(332);

  &__section {
    @include flex($direction: column, $align: flex-start);
    gap: space(4);

    width: rem(248);
  }

  &__header-content {
    color: $neutral-on-surface-variant;

    font-size: rem(12);
    font-weight: 400;
  }

  &__categories-list {
    @include flex($justify: flex-start);
    flex-wrap: wrap;
    gap: space(2);

    width: 100%;
  }

  &__categories-item {
    @include flex;
    gap: space(0.5);

    padding: space(1) space(2);

    background-color: $primary-container;
    border-radius: $radius-4xl;
    border: 1px solid transparent;

    cursor: pointer;

    &--active {
      border-color: var(--category-border);
    }
  }

  &__category-name {
    @include button-reset;
  }

  &__delete-button {
    @include flex;
    @include button-reset;

    position: relative;

    width: rem(14);
    height: rem(14);

    border: 1px solid $primary;
    border-radius: 100%;
  }

  &__delete-icon {
    line-height: 1;
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

  &__category-new {
    min-width: rem(30);

    border: none;
    outline: none;
    cursor: text;

    field-sizing: content;
  }

  &__pick-color {
    @include flex(column, $align: stretch, $justify: flex-start);
    gap: space(2);
  }

  &__color-list {
    @include flex($align: stretch, $justify: flex-start);
    gap: space(2);
  }

  &__color {
    @include flex;

    width: rem(24);
    height: rem(24);

    border-radius: $radius-pill;
    border: 1px solid $neutral-outline;

    cursor: pointer;
  }
}
</style>
