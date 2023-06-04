import React from 'react';

import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui';
import { useThemeStore } from './state-management/Store';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const StateWrapper: React.FC = () => {
  const cache = createCache({
    key: 'codesandbox',
    container: document.querySelector(
      'meta[name="emotion-styles"]'
    ) as HTMLStyleElement,
  });

  cache.compat = true;

  const { theme } = useThemeStore();

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

  const router = createBrowserRouter(routes);
  return (
    <React.StrictMode>
      <EuiProvider
        cache={cache}
        colorMode={theme}
        css={{ transition: 'background 0s linear' }}
      >
        <RouterProvider router={router} />
      </EuiProvider>
    </React.StrictMode>
  );
};

export default StateWrapper;
