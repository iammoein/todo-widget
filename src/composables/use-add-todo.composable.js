import { useTodoStore } from "@/stores/todo.store.js";
import { useFocus } from "./use-focus.composable";

export function useAddTodo() {
  const todoStore = useTodoStore();
  const { focus, focusLastItem } = useFocus();

  const handleAddTodo = async () => {
    const list = todoStore.todoList.get(todoStore.currentCategory);

    if (todoStore.checkTodoEmptyItem > 1) {
      const emptyTodoId = list.find((todo) => todo.text === "").id;
      focus(emptyTodoId);
      return;
    }

    todoStore.addTodo();
    await focusLastItem(list);
  };

  return { handleAddTodo };
}
