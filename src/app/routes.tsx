import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { RetailPOS } from './pages/RetailPOS';
import { WholesalePOS } from './pages/WholesalePOS';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/retail',
    element: (
      <ProtectedRoute>
        <RetailPOS />
      </ProtectedRoute>
    ),
  },
  {
    path: '/wholesale',
    element: (
      <ProtectedRoute>
        <WholesalePOS />
      </ProtectedRoute>
    ),
  },
]);