/**
 * eslint-disable react-hooks/rules-of-hooks
 *
 * @format
 */

/** @format */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'moment/min/locales';
import { fetechwedherapi } from './features/counter/countreSlice';
import Weather from './weather';
import { weather_data } from './createconext/createcontext';
import Weather_eng from './Weather-english';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { changevalue } from './features/counter/countreSlice';
import { Prev } from 'react-bootstrap/esm/PageItem';
let cancelAxios = null;
let weather_elements = {
  name: '',
  temps: null,
  max: null,
  min: null,
  desc: '',
  icon: '',
  date: '',
  name_ar: '',
  date_ar: '',
  isloding: true,
};
function App() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.weather.value);
  const [weadther, setTemp] = useState(weather_elements);
  const [lotAndLat, setLotAndlat] = useState({
    lot: null,
    lat: null,
  });
  const isloading = useSelector((state) => state.weather.isloding);
  useEffect(() => {
    setTemp((prev) => ({ ...prev, isloding: isloading }));
  }, [isloading]);
  useEffect(() => {
    const date_ar = moment().locale('ar').format('dddd, MMMM Do YYYY');
    const date = moment().format('dddd, MMMM Do YYYY');

    setTemp((prev) => ({ ...prev, date_ar, date }));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLotAndlat({
          lat: position.coords.latitude,
          lot: position.coords.longitude,
        });
      });
    } else {
      alert("user can't used location");
    }
  }, []);

  useEffect(() => {
    if (lotAndLat.lat && lotAndLat.lot) {
      dispatch(fetechwedherapi(lotAndLat));
    }
  }, [lotAndLat.lat, lotAndLat.lot]);
  const weather = useSelector((state) => state.weather.result);
  useEffect(() => {
    setTemp((prev) => ({
      ...prev,
      name: weather.name,
      temps: weather.temps,
      max: weather.max,
      min: weather.min,
      desc: weather.desc,
      icon: weather.icon,
    }));
  }, [weather]);

  return (
    <>
      <div style={{ background: '#2360df', height: '100vh', width: '100vw' }}>
        <weather_data.Provider value={weadther}>
          <BrowserRouter>
            <div
              style={{
                background: '#2360df',
                height: '100vh',
                width: '100vw',
              }}>
              <Routes>
                <Route path='/' element={<Weather />} />

                <Route path='/english' element={<Weather_eng />} />
              </Routes>
            </div>
          </BrowserRouter>
        </weather_data.Provider>
      </div>
    </>
  );
}

export default App;
