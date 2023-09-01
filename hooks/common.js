import { useFocusEffect } from '@react-navigation/core';
import * as Clipboard from 'expo-clipboard';
import { useCallback, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalSelectorFamily } from 'recoil/common/modal/selector';
import { refreshSelectorFamily } from 'recoil/common/refresh/selector';

const useModal = (modalId) => {
  const [modal, setModal] = useRecoilState(modalSelectorFamily(modalId));
  const resetModal = useResetRecoilState(modalSelectorFamily(modalId));

  const openModal = () => {
    setModal((prev) => ({ ...prev, visible: true }));
  };

  const hideModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  const closeModal = () => {
    resetModal();
  };

  return { modal, setModal, openModal, hideModal, closeModal };
};

const useRefresh = (refreshId) => {
  const [refresh, setRefresh] = useRecoilState(refreshSelectorFamily(refreshId));

  /** 새로고침 */
  const onRefresh = useCallback(() => {
    setRefresh((prev) => ({ ...prev, refreshing: true }));
    setTimeout(() => {
      setRefresh((prev) => ({ ...prev, refreshing: false }));
    }, 1000);
  }, [setRefresh]);

  return { refresh, onRefresh };
};

const useStringClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);

  const copyToClipboard = async (data) => {
    try {
      await Clipboard.setStringAsync(data);
      setIsCopied(true);
      setIsError(false);
    } catch {
      setIsCopied(false);
      setIsError(true);
    }
  };

  return { copyToClipboard, isCopied, setIsCopied, isError };
};

export { useModal, useRefresh, useStringClipboard };
