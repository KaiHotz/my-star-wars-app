import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { MainLayout } from './components/Layouts';
import { Spinner } from './ui-kit';
import { routePath } from './routes';

const Category = lazy(() => import('./pages/Category'));
const Search = lazy(() => import('./pages/Search'));

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
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
              <Route path="*" element={<Navigate to={routePath.search} />} />
            </Route>
            <Route path={routePath.category} element={<MainLayout />}>
              <Route
                index
                path=":category"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Category />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to={routePath.search} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
