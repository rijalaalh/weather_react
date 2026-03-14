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
  console.log(result);
  const [weadther, setTemp] = useState(weather_elements);
  const [lot, setLot] = useState(null);
  const [lat, setLat] = useState(null);
  const isloading = useSelector((state) => state.weather.isloding);
  useEffect(() => {
    setTemp({ ...weadther, isloding: isloading });
  },[isloading]);
  console.log(weadther.isloding)
  useEffect(() => {
    const date_ar = moment().locale('ar').format('dddd, MMMM Do YYYY');
    const date = moment().format('dddd, MMMM Do YYYY');

    setTemp({ ...weadther, date_ar: date_ar, date: date });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLot(position.coords.longitude);
        setLat(position.coords.latitude);
        console.log(position.coords.longitude);
      });
    } else {
      alert("user can't used location");
    }
  }, []);
  useEffect(() => {
    if (lat && lot) {
      console.log(lat || lot);
      console.log('using fetechweatherapi');
      dispatch(fetechwedherapi());
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lot}&appid=f1c396f97b6a65be8759673895a3b105`,
          {
            cancelToken: new axios.CancelToken((c) => {
              cancelAxios = c;
            }),
          },
        )
        .then((rep) => {
          const data = rep.data;
          console.log(data);
          setTemp({
            ...weadther,
            name: data.name,
            temps: Math.round(data.main.temp - 272.15),
            max: Math.round(data.main.temp_max - 272.15),
            min: Math.round(data.main.temp_min - 272.15),
            desc: data.weather[0].description,
            icon: `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      return () => {
        console.log('cancelling');
        if (cancelAxios) cancelAxios();
      };
    }
  }, [lat, lot]);
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
