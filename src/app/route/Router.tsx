import { AccauntInfo, EventPage, GiftPage, LoginPage, RegisterPage, StartPage } from '@/pages';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StartPage />} />
          <Route path="/main" element={<GiftPage />} />
          <Route path="/accaunt-info" element={<AccauntInfo />} />
          <Route path="/event-page" element={<EventPage />} />
        </Route>
      </Routes>
    </>
  );
}
