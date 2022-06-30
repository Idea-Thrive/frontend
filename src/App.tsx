import store from 'store';
import Boot from 'components/boot';

declare global {
  interface Window {
    store: any;
  }
}

export const App = () => {
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }
  return <Boot />;
};
