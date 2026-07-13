import { CATEGORY_COLORS } from "@/constants/category-colors.constant";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

export const useTodoStore = defineStore(
  "todo",
  () => {
    const categoryList = ref([...mockCategory]);
    const todoList = ref(
      new Map(categoryList.value.map((category) => [category.id, []])),
    );
    const colorIndex = ref(2);
    const currentCategory = ref("all");
    const todoSettings = ref(false);

    const addTodo = (text = "") => {
      todoList.value
        .get(currentCategory.value)
        ?.push({ id: Date.now(), text, checked: false });
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

    const deleteTodo = (id) => {
      const filtered = todoList.value
        .get(currentCategory.value)
        .filter((todo) => todo.id !== id);

      todoList.value.set(currentCategory.value, filtered);
    };

    const toggleCheckedTodo = (id) => {
      const item = todoList.value
        .get(currentCategory.value)
        .find((todo) => todo.id === id);
      item.checked = !item.checked;
    };

    const selectCategory = (categoryId) => {
      currentCategory.value = categoryId;
    };

    const getCategoryName = (categoryId) => {
      return categoryList.value.find((category) => category.id === categoryId)
        ?.name;
    };

    const updateCategoryColor = (categoryId, color) => {
      const category = categoryList.value.find((c) => c.id === categoryId);

      if (category) {
        category.color = color;
      }
    };

    const deleteCategory = (categoryId) => {
      categoryList.value = categoryList.value.filter(
        (category) => category.id !== categoryId,
      );
      todoList.value.delete(categoryId);
      currentCategory.value = "all";
    };

    const checkTodoEmptyItem = computed(() => {
      return todoList.value
        .get(currentCategory.value)
        .reduce(
          (count, todo) => (todo.text.trim() === "" ? count + 1 : count),
          1,
        );
    });

    return {
      todoList,
      categoryList,
      currentCategory,
      todoSettings,
      checkTodoEmptyItem,

      addTodo,
      addCategory,
      deleteTodo,
      deleteCategory,
      selectCategory,
      getCategoryName,
      toggleCheckedTodo,
      updateCategoryColor,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (value) => {
          const todoList = [...value.todoList].map(([category, todos]) => {
            return [category, todos.filter((todo) => todo.text.trim() !== "")];
          });

          return JSON.stringify({
            ...value,
            todoList,
          });
        },

        deserialize: (value) => {
          const parsed = JSON.parse(value);

          return {
            ...parsed,
            todoList: new Map(parsed.todoList),
          };
        },
      },
    },
  },
);
