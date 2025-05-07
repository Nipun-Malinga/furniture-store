import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import FurnitureInfoContainer from './components/FurnitureInfoContainer';
import Home from './pages/Home';
import Room from './pages/Room';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import Layout from './pages/Layout';

/*TODO: Fix Protected Router Issues */
const router = createBrowserRouter([
  {
    index: true,
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Home />,
        children: [
          {
            path: 'category/:categoryId/product/:productId',
            element: <FurnitureInfoContainer />,
          },
        ],
      },
      {
        path: 'room',
        element: <Room />,
      },
    ],
  },
]);

export default router;
