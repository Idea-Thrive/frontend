import { ColorModeScript } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { setup } from 'i18n/i18n';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

async function render() {
  await setup();

  root.render(
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>,
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
