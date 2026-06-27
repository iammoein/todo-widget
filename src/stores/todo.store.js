import { CATEGORY_COLORS } from "@/constants/category-colors.constant";
import { defineStore } from "pinia";
import { ref } from "vue";

const mockCategory = [
  {
    id: "all",
    name: "همه",
    key: "all",
    color: CATEGORY_COLORS[0],
  },
  {
    id: "signal",
    name: "سیگنال",
    key: "signal",
    color: CATEGORY_COLORS[1],
  },
];

const mockTodo = [
  {
    id: 1,
    text: "hi",
    parent: "all",
    parentId: null,
  },
  {
    id: 2,
    text: "me",
    parent: "signal",
    parentId: "signal",
  },
];

export const useTodoStore = defineStore("todo", () => {
  const categoryList = ref([...mockCategory]);
  const todoList = ref(
    new Map(categoryList.value.map((category) => [category.id, []])),
  );
  const colorIndex = ref(2);
  const currentCategory = ref("all");

  const addTodo = () => {
    todoList.value
      .get(currentCategory.value)
      ?.push({ id: Date.now(), text: "", done: false });
  };

  const addCategory = (name) => {
    const color = CATEGORY_COLORS[colorIndex.value % CATEGORY_COLORS.length];
    colorIndex.value++;
    const categoryId = Date.now();
    categoryList.value.push({
      id: categoryId,
      name,
      color,
    });
    todoList.value.set(categoryId, []);
  };

  const selectCategory = (categoryId) => {
    currentCategory.value = categoryId;
  };

  const getCategoryName = (categoryId) => {
    return categoryList.value.find((category) => category.id === categoryId)
      ?.name;
  };

  return {
    todoList,
    categoryList,
    currentCategory,

    addTodo,
    addCategory,
    selectCategory,
    getCategoryName,
  };
});
