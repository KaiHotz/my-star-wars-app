import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Spinner } from './ui-kit';
import { MainLayout } from './components/Layouts';
import { routePath } from './routes';

const Category = lazy(() => import('./pages/Category'));
const Search = lazy(() => import('./pages/Search'));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path={routePath.search} element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Spinner />}>
                  <Search />
                </Suspense>
              }
            />
          </Route>
          <Route path={routePath.category} element={<MainLayout />}>
            <Route
              index
              path=":recource"
              element={
                <Suspense fallback={<Spinner />}>
                  <Category />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to={routePath.search} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
