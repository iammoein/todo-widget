import { nextTick } from "vue";

const focusMap = new Map();

export const useFocus = () => {
  const register = (id, el) => {
    if (el) focusMap.set(id, el);
    else focusMap.delete(id);
  };

  const focus = (id) => {
    focusMap.get(id)?.focus();
  };

  const focusLastItem = async (list) => {
    await nextTick();
    const newId = list.at(-1)?.id;
    focus(newId);
  };

  return { register, focus, focusLastItem };
};
