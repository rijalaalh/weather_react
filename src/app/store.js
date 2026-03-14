/** @format */

import { configureStore } from '@reduxjs/toolkit';
import weather_api from '../features/counter/countreSlice';
export const store = configureStore({
  reducer: {
    weather: weather_api,
  },
});
