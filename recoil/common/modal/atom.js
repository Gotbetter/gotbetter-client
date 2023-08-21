import { atom, atomFamily } from 'recoil';

/** 모달 생성 Atom Family */
const modalsAtomFamily = atomFamily({
  key: 'modalsAtomFamily',
  default: (id) => ({
    id,
    visible: false,
  }),
});

/** 생성된 modal 들을 저장할 atom */
const modalIdsAtom = atom({
  key: 'modalIdsAtom',
  default: [],
});

export { modalsAtomFamily, modalIdsAtom };
