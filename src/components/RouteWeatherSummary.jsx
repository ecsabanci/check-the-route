import WeatherPoint from './WeatherPoint';

const RouteWeatherSummary = ({ weatherPoints, duration, route, openInGoogleMaps, distance }) => {
  if (weatherPoints.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">
          Enter a route to see weather conditions
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">

      <div className="mb-4 p-3 bg-green-400/50 rounded flex justify-between items-center">
        {duration && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Yolculuk Süresi</h3>
            <p>{duration}</p>
            <p className="text-sm text-gray-500 italic">{distance}</p>
          </div>
        )}
        {route && (
          <button
            onClick={openInGoogleMaps}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 relative group"
          >
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded whitespace-nowrap z-50">
              Open in Google Maps
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l4 4V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-4 md:max-h-[300px] md:overflow-y-scroll mb-10">
        <h2 className="text-xl font-semibold mb-4">Weather Conditions</h2>
        {weatherPoints.map((point, index) => (
          <WeatherPoint
            key={index}
            data={point}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteWeatherSummary;