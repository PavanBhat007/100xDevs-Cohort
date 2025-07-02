import { atom, atomFamily, selectorFamily } from "recoil";
import { TODOS } from "./todos";
import axios from 'axios';

// atomFamily
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: (id) => {
    return TODOS.find((x) => x.id == id);
  },
});

// selectorFamily
export const todosAtomSelectorFamily = atomFamily({
  key: 'todosAtomSelectorFamily',
  default: selectorFamily({
    key: 'todoSelectorFamily',
    get: (id) => async ({ get }) => {
      const res = await axios.get(`http://localhost:8080/todo?id=${id}`);
      return res.data.todo;
    }
  })
})

// export const todosAtomSelectorFamily = atomFamily({
//   key: 'todosAtomSelectorFamily',
//   default: selectorFamily({
//     key: 'todoSelectorFamily',
//     get: function (id) {
//       return async function ({ get }) {
//         const res = await axios.get(`http://localhost:8080/todo?id=${id}`);
//         return res.data.todo;
//       }
//     }
//   )
// })

export const todoAtom = atom({
    key: 'todoAtom',
    default: {}
})