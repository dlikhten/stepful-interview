import { spraypaintAll } from 'models/spraypaint_all';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { mainStore } from 'store/store';
import 'styles/globals.css';

// Ensure all Record models are loaded for all pages!
spraypaintAll();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={mainStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
