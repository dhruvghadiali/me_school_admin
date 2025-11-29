import { StrictMode } from 'react';
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import store from "@/store";

import '@/index.css';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
