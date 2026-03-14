/** @format */
import axios from 'axios'; // add this import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './weather.css';
import { weather_data } from './createconext/createcontext';
import Spinner from 'react-bootstrap/Spinner';
function Weather() {
  const { temps, name, max, min, desc, date_ar, icon, isloding } =
    useContext(weather_data);
  const [translated, setTranslated] = useState({
    name_ar: '',
    desc_ar: '',
  });

  useEffect(() => {
    async function retranslated() {
      const result1 = await translateText(name, 'ar');
      const result2 = await translateText(desc, 'ar');
      setTranslated({ name_ar: result1, desc_ar: result2 });
    }
    if (name || desc) {
      retranslated();
    }
  }, [name, desc]);

  const navigate = useNavigate();

  return (
    <>
      <div className='box1'>
        <div className='container'>
          <div className='div-name'>
            <div className='name'>
              {translated.name_ar ?
                <h1>{translated.name_ar}</h1>
              : <Spinner animation='border' />}
            </div>
            <div className='date'>{date_ar}</div>
          </div>
          <hr />
          <div className='weatherDay'>
            <div className='weather'>
              <div className='condition'>
                {temps ?
                  <h1>{temps}</h1>
                : <Spinner animation='border' />}
                {icon ?
                  <img src={icon} alt='weather condition' />
                : <Spinner animation='border' />}
              </div>
              {translated.desc_ar ?
                <p>{translated.desc_ar}</p>
              : <Spinner animation='border' />}
              <p>
                الصغرى :{min} الكبرى : {max}
              </p>
            </div>
            <div className='img-weadther'>
              <FontAwesomeIcon icon={faCloud} style={{ fontSize: '150px' }} />
            </div>
          </div>
          <Button
            style={{
              position: 'absolute',
              bottom: '-45px',
              left: '0',
              background: '#44444400',
              border: 'none',
            }}
            onClick={() => navigate('/english')}>
            انجلزي
          </Button>
        </div>
      </div>
    </>
  );
}

// Using axios instead of fetch
async function translateText(text, targetLang) {
  try {
    const response = await axios.get(
      'https://api.mymemory.translated.net/get',
      {
        params: {
          q: text,
          langpair: `en|${targetLang}`,
        },
      },
    );
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // fallback to original text if translation fails
  }
}

export default Weather;
