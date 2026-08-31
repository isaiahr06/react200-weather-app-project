import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const apiKey = process.env.WEATHER_API_KEY;

app.get('/api/search/:city', async (req, res) => {
  const cityName = req.params.city;

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: cityName,
          appid: apiKey,
          units: 'imperial'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;

    if (status === 404) {
      return res.status(404).json({
        message: 'City not found'
      });
    }

    res.status(status).json({
      message: 'Unable to retrieve weather data'
    });
  }
});

export default app;