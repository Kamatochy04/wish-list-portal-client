import { LoginPage } from '@/pages';
import { Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}
