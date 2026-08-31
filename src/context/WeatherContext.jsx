import { createContext, useReducer } from 'react';

const WeatherContext = createContext();

const initialState = {
  loading: false,
  error: null,
  data: null
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null
      };

    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;