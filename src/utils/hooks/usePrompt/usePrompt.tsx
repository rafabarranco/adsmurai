import { useEffect } from 'react';
import { createBrowserHistory, Transition } from 'history';

const history = createBrowserHistory();

export const usePrompt = (message: string, when: boolean) => {
  useEffect(() => {
    if (!when) return;

    const unblock = history.block((tx: Transition) => {
      const confirmNavigation = window.confirm(message);
      if (confirmNavigation) {
        unblock();
        tx.retry();
      }
    });

    return unblock;
  }, [when, message]);
};
