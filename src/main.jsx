import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter.jsx'
import { AudioProvider } from './components/AudioProvider.jsx'
import { PokemonProvider } from "./components/PokemonProvider.jsx";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PokemonProvider>
    <AudioProvider>
          <AppRouter />
    </AudioProvider>
   </PokemonProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
