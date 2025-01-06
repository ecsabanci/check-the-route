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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // default to dark if no preference
  });
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routePoints, setRoutePoints] = useState({ start: '', end: '' });

  // Update useEffect to save preference to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

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
      <div className="min-h-screen px-3 md:px-0 bg-white dark:bg-gray-900 dark:text-white md:max-h-screen md:overflow-y-hidden overflow-y-auto">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white logo">
              check.route
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-900 shadow-lg transition-colors dark:bg-blue-800 group"
              aria-label="Toggle map theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-gray-100 transition-transform group-hover:rotate-90 duration-1000" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-100 transition-transform group-hover:scale-x-[-1] duration-500" />
              )}
            </button>
          </div>
          <div>
            <div className="flex flex-col flex-col-reverse gap-4 lg:grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
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