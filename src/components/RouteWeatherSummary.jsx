import WeatherPoint from './WeatherPoint';

const RouteWeatherSummary = ({ weatherPoints, duration, route, openInGoogleMaps, distance }) => {
  if (weatherPoints.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <p className="text-gray-900 dark:text-white text-center">
          Hava koşulları bilgilerini görmek için başlangıç ve bitiş noktalarını giriniz.
        </p>
      </div>
    );
  }

  return (
    <div>

      <div className="mb-4 p-3 bg-emerald-600 rounded flex justify-between items-center">
        {duration && (
          <div>
            <h3 className="text-lg font-semibold mb-1 text-white">Yolculuk Süresi</h3>
            <p className="text-white italic">{duration}</p>
            <p className="text-sm text-white italic">{distance}</p>
          </div>
        )}
        {route && (
          <button
            onClick={openInGoogleMaps}
            className="text-white p-2 rounded hover:bg-blue-600 relative group bg-blue-800"
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

      <div className="">
        <div className="space-y-4 md:max-h-[300px] md:overflow-y-scroll mb-10 scrollbar-hide">
          <h2 className="text-xl font-semibold mb-4">Detaylı Hava Koşulları</h2>
          {weatherPoints.map((point, index) => (
            <WeatherPoint
              key={index}
              data={point}
            />
          ))}
        </div>
        <div className="fixed bottom-2 right-6 md:bottom-4 md:right-24 transform -translate-x-1/2 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-indigo-500 dark:text-indigo-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RouteWeatherSummary;