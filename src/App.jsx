import { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import RouteForm from './components/RouteForm';
import WeatherMap from './components/WeatherMap';
import RouteWeatherSummary from './components/RouteWeatherSummary';
import { getRoute } from './services/mapService';
import { getWeatherForPoints } from './services/weatherService';

function App() {
  const [route, setRoute] = useState(null);
  const [weatherPoints, setWeatherPoints] = useState([]);

  const handleRouteSubmit = async (start, end) => {
    try {
      // Show loading state (you might want to add a loading state to your component)
      const { route, waypoints } = await getRoute(start, end);
      const weatherData = await getWeatherForPoints(waypoints);
      
      setRoute(route);
      setWeatherPoints(weatherData);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (you might want to add error state and display to user)
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Route Weather Checker
          </h1>
          
          <RouteForm onSubmit={handleRouteSubmit} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <WeatherMap route={route} weatherPoints={weatherPoints} />
            <RouteWeatherSummary weatherPoints={weatherPoints} />
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

export default App;