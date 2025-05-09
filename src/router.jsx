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
    element: <LoginPage />, // Unprotected login
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'category/:categoryId/product/:productId',
            element: (
              <ProtectedRoute>
                <FurnitureInfoContainer />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'room',
        element: (
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;