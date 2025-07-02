import { atom, selector } from "recoil";

export const todoAtom = atom({
  key: "todoAtom",
  default: [],
});

export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});

export const filteredTodos = selector({
  key: "filteredTodos",
  get: ({get}) => {
    const todos = get(todoAtom);
    const filter = get(filterAtom);

    return todos.filter(
      (x) => x.title.includes(filter) || x.description.includes(filter)
    );
  },
});