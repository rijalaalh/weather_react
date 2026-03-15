/** @format */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect ,useState} from 'react';
export const fetechwedherapi = createAsyncThunk(
  'weatherapi/feteching',
  async (LotAndlat,thunapi) => {
    let cancelAxios = null;
    const resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LotAndlat.lat}&lon=${LotAndlat.lot}&appid=f1c396f97b6a65be8759673895a3b105`,
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      },
    );
    const response = resp.data;
    const name = response.name;
    const temps = Math.round(response.main.temp - 272.15);
    const max = Math.round(response.main.temp_max - 272.15);
    const min = Math.round(response.main.temp_min - 272.15);
    const desc = response.weather[0].description;
    const icon = `https://openweathermap.org/payload/api/media/file/${response.weather[0].icon}.png`;
    return { name, temps, max, min, desc, icon };
  },
);
const weather_api = createSlice({
  name: 'weather',
  initialState: {
    value: 'empty',
    result: {},
    isloding: false,
  },
  reducers: {
    changevalue: (state, action) => {
      state.value = 'changed';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetechwedherapi.pending, (state, action) => {
        state.isloding = true;
      })
      .addCase(fetechwedherapi.fulfilled, (state, action) => {
        state.isloding = false;
        state.result = action.payload;
        console.log(state.result);
      })
      .addCase(fetechwedherapi.rejected, (state, action) => {
        state.isloding = false;
      });
  },
});
export const { changevalue } = weather_api.actions;
export default weather_api.reducer;
