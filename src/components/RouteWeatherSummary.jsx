import WeatherPoint from './WeatherPoint';

const RouteWeatherSummary = ({ weatherPoints }) => {
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Weather Conditions</h2>
      {weatherPoints.map((point, index) => (
        <WeatherPoint 
          key={index} 
          data={point}
        />
      ))}
    </div>
  );
};

export default RouteWeatherSummary;