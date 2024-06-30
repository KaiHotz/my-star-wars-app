import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CategoriesProvider } from './providers';
import { ThemeProvider } from './ui-kit';
import App from './App.tsx';
import './main.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
    <IntlProvider
      locale="en"
      formats={{
        date: {
          'month': { year: 'numeric', month: 'long' },
          'long': { year: 'numeric', month: 'long', day: 'numeric' },
          'short': { year: 'numeric', month: 'short', day: 'numeric' },
          'dateTime': { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        },
      }}
    >
      <ThemeProvider name="star-wars">
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </ThemeProvider>
    </IntlProvider>
  </QueryClientProvider>,
);
