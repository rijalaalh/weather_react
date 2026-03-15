/** @format */
import { useNavigate } from 'react-router-dom';
import cloud from './6322.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { weather_data } from './createconext/createcontext';
import './weather_eng.css';
import Spinner from 'react-bootstrap/Spinner';
export default function Weather_eng() {
  const { temps, name, max, min, desc, icon, date, isloding } =
    useContext(weather_data);
  const navigate = useNavigate();
  return (
    <div className='box'>
      {isloding ?
        <div>
          <Spinner animation='border' variant='light' />
        </div>
      : <div className='container'>
          <div className='div-name'>
            <div className='name'>
              <h1>{name}</h1>
            </div>
            <div className='date'>{date}</div>
          </div>
          <hr />
          <div className='weatherDay'>
            <div className='weather'>
              <div className='condition'>
                <h1>{temps}</h1>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={icon} alt='weather condition' />
              </div>
              <p>{desc}</p>
              <p>
                min:{min} max:{max}
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
            onClick={() => navigate('/')}>
            ARABIC
          </Button>
        </div>
      }
    </div>
  );
}
