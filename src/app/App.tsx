import { BrowserRouter } from "react-router-dom";
import AppRouter from "./route/Router";

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
