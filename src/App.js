import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom';

import Appbar from './components/Appbar/index';
import Footer from './components/Footer';
import { ContextProvider } from './context/context_provider';

import { Home } from './pages';

const PageLayout = () => (
  <>
    <Appbar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<PageLayout />}>
      <Route index element={<Home />} />
    </Route>
  )
);

const App = () => {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
};

export default App;