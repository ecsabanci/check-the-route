import { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import RouteForm from './components/RouteForm';
import WeatherMap from './components/WeatherMap';
import RouteWeatherSummary from './components/RouteWeatherSummary';
import { getRoute } from './services/mapService';
import { getWeatherForPoints } from './services/weatherService';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

// Move the libraries array outside the component
const libraries = ['places'];

function App() {
  const [route, setRoute] = useState(null);
  const [weatherPoints, setWeatherPoints] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routePoints, setRoutePoints] = useState({ start: '', end: '' });

  const handleRouteSubmit = async (start, end) => {
    try {
      setRoutePoints({ start, end });
      const { route, waypoints, duration, distance } = await getRoute(start, end);
      const weatherData = await getWeatherForPoints(waypoints);
      
      setRoute(route);
      setWeatherPoints(weatherData);
      setDuration(duration);
      setDistance(distance);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const openInGoogleMaps = () => {
    if (routePoints.start && routePoints.end) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routePoints.start)}&destination=${encodeURIComponent(routePoints.end)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="md:max-h-screen bg-gray-100 md:overflow-y-hidden overflow-y-auto">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-center">
              Route Weather Checker
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle map theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-100" />
              )}
            </button>
          </div>
          
          
          <div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <WeatherMap 
                  route={route} 
                  weatherPoints={weatherPoints} 
                  isDarkMode={isDarkMode}
                />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                  <RouteForm onSubmit={handleRouteSubmit} />
                  <RouteWeatherSummary 
                    weatherPoints={weatherPoints}
                    duration={duration}
                    route={route}
                    distance={distance}
                    openInGoogleMaps={openInGoogleMaps}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

export default App;