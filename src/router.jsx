import React from 'react';
import { createBrowserRouter } from 'react-router';
import FurnitureInfoContainer from './components/FurnitureInfoContainer';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Room from './pages/Room';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'category/:categoryId/product/:productId',
        element: <Home />,
        children: [
          {
            index: true,
            element: <FurnitureInfoContainer />,
          },
        ],
      },
      {
        path: '/room',
        element: <Room />,
      },
    ],
  },
]);

export default router;
