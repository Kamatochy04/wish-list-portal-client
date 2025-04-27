import { LoginPage, RegisterPage } from '@/pages';
import { Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}
