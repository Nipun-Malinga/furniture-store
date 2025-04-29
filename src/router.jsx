import React from 'react';
import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import Home from './pages/Home';
import FurnitureInfoContainer from './components/FurnitureInfoContainer';

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
    ],
  },
]);


export default router;
