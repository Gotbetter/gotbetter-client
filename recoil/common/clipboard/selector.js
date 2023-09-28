import { DefaultValue, selectorFamily } from 'recoil';

import { clipboardFamily, clipboardIds } from './atom';

const clipboardSelectorFamily = selectorFamily({
  key: 'clipboardSelectorFamily',
  get:
    (id) =>
    ({ get }) =>
      get(clipboardFamily(id)),
  set:
    (id) =>
    ({ get, set, reset }, clipboard) => {
      if (clipboard instanceof DefaultValue) {
        reset(clipboardFamily(id));
        set(clipboardIds, (prev) => prev.filter((prevItem) => prevItem !== id));
        return;
      }

      if (clipboard) {
        const existsClipboards = get(clipboardIds);

        existsClipboards.forEach((itemId) => {
          if (itemId !== id) set(clipboardFamily(itemId), { id: itemId, isCopied: false });
        });
      }
      set(clipboardIds, (prev) => Array.from(new Set([...prev, clipboard.id])));
      set(clipboardFamily(id), clipboard);
    },
});

export { clipboardSelectorFamily };
