import { DefaultValue, selectorFamily } from 'recoil';

import { modalIdsAtom, modalsAtomFamily } from './atom';

/**
 * @param {modalId} : 생성하고자 하는 모달의 id
 * 넘겨 받은 modalId를 저장하는 atom family를 생성하고 modalIds atom에 등록
 */
const modalSelectorFamily = selectorFamily({
  key: 'modalSelectorFamily',
  get:
    (modalId) =>
    ({ get }) =>
      get(modalsAtomFamily(modalId)),

  set:
    (modalId) =>
    ({ get, set, reset }, modal) => {
      if (modal instanceof DefaultValue) {
        reset(modalsAtomFamily(modalId));
        set(modalIdsAtom, (prev) => prev.filter((prevItem) => prevItem !== modalId));

        return;
      }

      set(modalsAtomFamily(modalId), modal);
      set(modalIdsAtom, (prev) => Array.from(new Set([...prev, modal.id])));
    },
});

export { modalSelectorFamily };
