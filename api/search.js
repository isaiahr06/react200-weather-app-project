import axios from 'axios';

export default async function handler(req, res) {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({
      message: 'City is required',
    });
  }

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'imperial',
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;

    if (status === 404) {
      return res.status(404).json({
        message: 'City not found',
      });
    }

    return res.status(status).json({
      message: 'Unable to retrieve weather data',
    });
  }
}