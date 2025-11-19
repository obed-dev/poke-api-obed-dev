import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter.jsx'
import { AudioProvider } from './components/AudioProvider.jsx'
import { PokemonProvider } from "./components/PokemonProvider.jsx";
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css'


const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
    <BrowserRouter>
      <PokemonProvider>
    <AudioProvider>
          <AppRouter />
         <ReactQueryDevtools initialIsOpen={false} />
    </AudioProvider>
   </PokemonProvider>
    </BrowserRouter>
  </QueryClientProvider>
  </React.StrictMode>,
)
