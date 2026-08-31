import { useContext } from 'react';
import WeatherContext from '../context/WeatherContext';

const weatherApiUrl = '/api/search';

const useWeather = () => {
  const { state, dispatch } = useContext(WeatherContext);

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      return;
    }

    dispatch({
      type: 'FETCH_START'
    });

    try {
      const response = await fetch(
        `${weatherApiUrl}/${encodeURIComponent(city.trim())}`
      );

      if (!response.ok) {
        throw new Error('City not found. Please try another city.');
      }

      const data = await response.json();

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: data
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error.message
      });
    }
  };

  return {
    ...state,
    fetchWeather
  };
};

export default useWeather;