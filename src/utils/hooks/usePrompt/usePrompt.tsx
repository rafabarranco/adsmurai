import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import { Transition } from 'history';
import { NavigationContextObject } from './types';

export const usePrompt = (message: string, when: boolean): void => {
  const { navigator } = useContext(
    UNSAFE_NavigationContext,
  ) as unknown as NavigationContextObject;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const confirmNavigation = window.confirm(message);
      if (confirmNavigation) {
        unblock();
        tx.retry();
      }
    });

    return unblock;
  }, [navigator, when, message]);
};
