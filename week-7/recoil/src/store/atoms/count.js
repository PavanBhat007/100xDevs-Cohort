import { atom, selector } from "recoil";

export const countAtom = atom({
  key: "countAtom", // unique way to identify this atom
  default: 0, // default value of the atom
});

export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => { // function
    const count = get(countAtom); // dependency
    return count % 2;
  },
});
