import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
], {
  future: {
    v7_startTransition: true,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </QueryClientProvider>
  </React.StrictMode>,
)
