import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherForPoints = async (points) => {
  try {
    const weatherPromises = points.map(point => 
      getWeatherForLocation(point.lat, point.lng, point.time)
    );

    return await Promise.all(weatherPromises);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const getWeatherForLocation = async (lat, lng) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_API_KEY}`
    );

    return {
      lat,
      lng,
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather for location:', error);
    throw error;
  }
};