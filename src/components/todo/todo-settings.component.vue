<template>
  <div class="todo-settings">
    <!-- <BaseIcon :icon="LineIocn" /> -->
    <BaseTitle
      class="todo-settings__header"
      title-tag="h5"
      title="تنظیمات ویجت"
    />
    <div class="todo-settings__content">
      <div class="todo-settings__section">
        <div class="todo-settings__section-header">
          <BaseTitle
            class="todo-settings__header-title"
            title-tag="h6"
            title="دسته بندی"
          >
            <p class="todo-settings__header-content">
              میتونی دسته‌بندی دلخواهت رو ایجاد یا حذف کنی
            </p>
          </BaseTitle>
        </div>

        <ul
          class="todo-settings__categories-list todo-settings__section-content"
        >
          <li
            v-for="category in filteredCategory"
            class="todo-settings__categories-item"
            :key="category.id"
          >
            <button
              @click="handleDeleteCategory(category.id)"
              class="todo-settings__delete-button"
            >
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
          <BaseTitle
            class="todo-settings__header-title"
            title-tag="h6"
            title="رنگ دسته بندی"
          >
            <p class="todo-settings__header-content">
              با انتخاب هر دسته بندی میتونی رنگش رو عوض کنی
            </p>
          </BaseTitle>
        </div>

        <div class="todo-settings__pick-color">
          <ul
            class="todo-settings__categories-list todo-settings__section-content"
          >
            <li v-for="category in todoStore.categoryList" :key="category.id">
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

      <div class="todo-settings__section">
        <div class="todo-settings__section-header">
          <BaseTitle
            class="todo-settings__header-title"
            title-tag="h6"
            title="جهت ویجت"
          >
            <p class="todo-settings__header-content">
              جهت دلخواهت رو انتخاب کن
            </p>
          </BaseTitle>

          <div class="todo-settings__options">
            <button
              v-for="dir in directions"
              :key="dir.value"
              class="todo-settings__option-button"
              @click="todoStore.selectDirection(dir.value)"
              :class="{
                'todo-settings__option-button--active':
                  todoStore.settings.direction === dir.value,
              }"
            >
              <BaseIcon :icon="dir.iconName" />
            </button>
          </div>
        </div>
      </div>

      <div class="todo-settings__section">
        <div class="todo-settings__section-header">
          <BaseTitle
            class="todo-settings__header-title"
            title-tag="h6"
            title="اندازه متن تسک"
          >
            <p class="todo-settings__header-content">
              اندازه متن دلخواهت رو انتخاب کن
            </p>
          </BaseTitle>

          <div class="todo-settings__options">
            <button
              v-for="size in fontSizes"
              :key="size.value"
              class="todo-settings__option-button"
              @click="todoStore.selectFontSize(size.value)"
              :class="{
                'todo-settings__option-button--active':
                  todoStore.settings.fontSize === size.value,
              }"
            >
              <BaseIcon :icon="size.iconName" size="14" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from "@/stores/todo.store";
import { computed, nextTick, ref } from "vue";
import { CATEGORY_COLORS } from "@/constants/category-colors.constant.js";

import DeleteIcon from "../icons/delete.icon.vue";
import PlusIcon from "@/components/icons/plus.icon.vue";
import BaseIcon from "../common/base-icon.component.vue";
import CheckIcon from "../icons/check.icon.vue";
import TextingLeftIcon from "../icons/texting-left.icon.vue";
import TextingRightIcon from "../icons/texting-right.icon.vue";
import MIcon from "../icons/m.icon.vue";
import SIcon from "../icons/s.icon.vue";

import BaseTitle from "../common/base-title.component.vue";
import LineIocn from "../icons/line.iocn.vue";

const categoryName = defineModel({
  type: String,
  default: "",
});

const editingCategory = ref(null);

const isAdding = ref(false);
const inputRef = ref(null);
const activeColor = ref(null);

const todoStore = useTodoStore();

const directions = [
  { value: "rtl", iconName: TextingRightIcon },
  { value: "ltr", iconName: TextingLeftIcon },
];

const fontSizes = [
  { value: "small", iconName: SIcon },
  { value: "medium", iconName: MIcon },
];

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

const handleDeleteCategory = (id) => {
  todoStore.deleteCategory(id);
};
</script>

<style lang="scss" scoped>
.todo-settings {
  @include flex($direction: column, $align: flex-start);
  gap: space(4);

  width: 100%;

  &__header {
    --base-title-font-size: 16px;
    --base-title-font-weight: 600;
  }

  &__content {
    @include flex($direction: column, $align: flex-start);
    gap: space(6);
  }

  &__section {
    @include flex($direction: column, $align: flex-start);
    gap: space(4);

    width: rem(248);
  }

  &__header-title {
    --base-title-font-size: 14px;
    --base-title-font-weight: 400;
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

  &__options {
    @include flex($align: flex-start, $justify: flex-start);
    gap: space(3);

    margin-top: space(3);
  }

  &__option-button {
    @include button-reset;

    width: rem(36);
    height: rem(36);
    padding: space(1.5);

    border-radius: $radius-md;
    background-color: $neutral-surface;
    border: 1px solid transparent;

    color: $neutral-on-surface;

    &--active {
      background-color: $primary-container;
      border-color: $primary;
      color: $primary;
    }
  }
}
</style>
