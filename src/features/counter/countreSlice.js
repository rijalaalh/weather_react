/** @format */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetechwedherapi = createAsyncThunk(
  'weatherapi/feteching',
  async (lot, lat) => {
    let cancelAxios = null;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${24}&lon=${46}&appid=f1c396f97b6a65be8759673895a3b105`,
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      },
    );
    //   setTemp({
    //     ...weadther,
    //     name: response.name,
    //     temps: Math.round(response.main.temp - 272.15),
    //     max: Math.round(response.main.temp_max - 272.15),
    //     min: Math.round(response.main.temp_min - 272.15),
    //     desc: response.weather[0].description,
    //     icon: `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`,
    //   });
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
    builder.addCase(fetechwedherapi.pending, (state,action) => {
      state.isloding = true;
    }).addCase(fetechwedherapi.fulfilled,(state,action)=>{
        state.isloding=false
        console.log("fetech/fulfilled"+state.isloding)
    }).addCase(fetechwedherapi.rejected,(state,action)=>{
        state.isloding=false;
    });
  },
});
export const { changevalue } = weather_api.actions;
export default weather_api.reducer;
