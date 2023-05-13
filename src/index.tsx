// import ReactDOM from 'react-dom/client'
// import Home from './pages/Home/Home.tsx'
// import './index.css'
// import '@elastic/eui/dist/eui_theme_light.css';

// import createCache from '@emotion/cache';
// import { EuiProvider } from '@elastic/eui';
// import { useThemeStore } from './pages/Home/components/Store'

// //Imports all icons thanks to vite/rollup workaround found by unckleg https://gist.github.com/unckleg/5476ebd940d1d473387bb082e8c2929c
// import importIcons from './pages/Home/resources/cache-icons.ts'
// importIcons();

// const cache = createCache({
//   key: 'codesandbox',
//   container: document.querySelector('meta[name="emotion-styles"]') as HTMLStyleElement,
// });
// cache.compat = true;

// const ThemeWrapper: React.FC = () => {
//   const {theme} = useThemeStore();
//   return (
//   <EuiProvider cache={cache} colorMode={theme} css={{transition: 'background 0s linear'}}>
//     <Home />
//   </EuiProvider>
//   )
// }

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <ThemeWrapper />
// );


import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import '@elastic/eui/dist/eui_theme_light.css';
import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui';
import { useThemeStore } from './pages/Home/components/Store';
import importIcons from './pages/Home/resources/cache-icons.ts';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

importIcons();

const StateWrapper: React.FC = () => {
  const cache = createCache({
    key: 'codesandbox',
    container: document.querySelector('meta[name="emotion-styles"]') as HTMLStyleElement,
  });

  cache.compat = true;

  const {theme} = useThemeStore();

  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
  ];

  const router = createBrowserRouter(routes)
  return (
  <React.StrictMode>
    <EuiProvider cache={cache} colorMode={theme} css={{transition: 'background 0s linear'}}>
      <RouterProvider router={router}/>
    </EuiProvider>
  </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StateWrapper/>
);
