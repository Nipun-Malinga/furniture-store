import React from 'react';
import { createBrowserRouter } from 'react-router-dom'; // ✅ Use react-router-dom
import FurnitureInfoContainer from './components/FurnitureInfoContainer';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Room from './pages/Room';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute'; // ✅ You must create this

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'category/:categoryId/product/:productId',
        element: <FurnitureInfoContainer />,
      },
    ],
  },
  {
    path: '/room', // ✅ still public unless you wrap it in ProtectedRoute too
    element: <Room />,
  },
  {
    path: '/login', // ✅ login page should be outside layout
    element: <LoginPage />,
  },
]);

export default router;