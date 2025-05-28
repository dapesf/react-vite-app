import { createRoot } from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from '../src/hooks/LoadingContext'
import { DialogProvider } from '../src/hooks/DialogContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <MemoryRouter >
    <LoadingProvider>
      <DialogProvider>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </DialogProvider>
    </LoadingProvider>
  </MemoryRouter >
)
