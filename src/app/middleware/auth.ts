import { registerApi } from '@/features/register/api/register.api';
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: registerApi.endpoints.register.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', action.payload.token);
    }
  },
});
