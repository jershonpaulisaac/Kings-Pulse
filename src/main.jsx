import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>,
)
