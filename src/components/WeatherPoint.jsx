const WeatherPoint = ({ data }) => {
    return (
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow dark:bg-gray-700 border dark:border-gray-600">
        <h3 className="font-semibold text-lg">{data.city}</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-gray-900 dark:text-white">Sıcaklık</p>
            <p className="font-medium">{data.temperature}°C</p>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Hava Durumu</p>
            <p className="font-medium">{data.condition}</p>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Nem</p>
            <p className="font-medium">{data.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Rüzgar</p>
            <p className="font-medium">{data.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherPoint;