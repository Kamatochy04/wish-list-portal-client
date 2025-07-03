import { BrowserRouter } from 'react-router-dom';
import AppRouter from './route/Router';

import './styles/index.scss';

import { Provider } from 'react-redux';
import { store } from './store/store';

export function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}
