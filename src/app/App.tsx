import { BrowserRouter } from 'react-router-dom';
import AppRouter from './route/Router';
import './styles/index.scss';

import { Provider } from 'react-redux';
import { store } from './store/store';
import GlobalUserLoader from './globalUserLoader';
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        <GlobalUserLoader />
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}
