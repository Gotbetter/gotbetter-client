import { atom, atomFamily } from 'recoil';

const clipboardFamily = atomFamily({
  key: 'clipboardFamily',
  default: (id) => ({
    id,
    isCopied: false,
  }),
});

const clipboardIds = atom({
  key: 'clipboardIds',
  default: [],
});

export { clipboardFamily, clipboardIds };
