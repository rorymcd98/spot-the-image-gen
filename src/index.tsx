import ReactDOM from 'react-dom/client';
import './index.css';
import '@elastic/eui/dist/eui_theme_light.css';
import importIcons from './resources/cache-icons.ts';

import StateWrapper from './StateWrapper.tsx';

importIcons();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StateWrapper />
);
