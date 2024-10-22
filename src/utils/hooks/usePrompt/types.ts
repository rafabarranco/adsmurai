import { Transition } from 'history';

interface HistoryNavigator {
  block: (callback: (tx: Transition) => void) => () => void;
}

export interface NavigationContextObject {
  navigator: HistoryNavigator;
}
