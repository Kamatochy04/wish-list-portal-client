import { BrowserRouter } from 'react-router-dom';
import AppRouter from './route/Router';

import './styles/index.scss';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
