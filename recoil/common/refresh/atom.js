import { atom, atomFamily } from 'recoil';

const refreshAtomsFamily = atomFamily({
  key: 'refreshAtomsFamily',
  default: (id) => ({
    id,
    refreshing: false,
  }),
});

const refreshIdsAtom = atom({
  key: 'refreshIdsAtom',
  default: [],
});

export { refreshAtomsFamily, refreshIdsAtom };
