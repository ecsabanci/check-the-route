const WeatherPoint = ({ data, time }) => {
  console.info(data);
    return (
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold text-lg">{data.city}</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-gray-600">Temperature</p>
            <p className="font-medium">{data.temperature}°C</p>
          </div>
          <div>
            <p className="text-gray-600">Condition</p>
            <p className="font-medium">{data.condition}</p>
          </div>
          <div>
            <p className="text-gray-600">Humidity</p>
            <p className="font-medium">{data.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-600">Wind</p>
            <p className="font-medium">{data.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherPoint;