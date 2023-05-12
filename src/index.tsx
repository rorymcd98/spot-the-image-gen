import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import '@elastic/eui/dist/eui_theme_light.css';

import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui';

//Imports all icons thanks to vite/rollup workaround found by unckleg https://gist.github.com/unckleg/5476ebd940d1d473387bb082e8c2929c
import importIcons from './resources/cache-icons'

importIcons();

const cache = createCache({
  key: 'codesandbox',
  container: document.querySelector('meta[name="emotion-styles"]') as HTMLStyleElement,
});
cache.compat = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <EuiProvider cache={cache} colorMode='light' >
    <App />
  </EuiProvider>
);