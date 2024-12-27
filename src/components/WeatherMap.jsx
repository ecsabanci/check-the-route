import { 
  GoogleMap, 
  Polyline, 
  InfoWindow,
  OverlayView
} from '@react-google-maps/api';
import { useState } from 'react';

const WeatherMap = ({ route, weatherPoints }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  console.info('weatherPoints', weatherPoints);

  const mapContainerStyle = {
    width: '100%',
    height: '600px' // Made it a bit taller
  };

  const center = route?.center || {
    lat: 39.9334,
    lng: 32.8597
  };

  const markerContainerStyle = {
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #666',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    width: '40px',
    height: '60px',
  };

  // Temperature label style
  const tempLabelStyle = {
    color: '#000000',
    fontSize: '12px',
    fontWeight: 'bold',
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-fit">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
      >
        {route && (
          <Polyline
            path={route.path}
            options={{
                strokeColor: '#279e1b', // Changed from '#FF0000' to green
                strokeOpacity: 0.8,
                strokeWeight: 4,        // Increased from 2 to 4 to make it bolder
            }}
        />
        )}
        
        {weatherPoints.map((point, index) => (
          <div key={index}>
            <OverlayView
              position={{ lat: point.lat, lng: point.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                style={markerContainerStyle}
                onClick={() => setSelectedPoint(point)}
              >
                <img 
                  src={`http://openweathermap.org/img/wn/${point.icon}@2x.png`}
                  alt={point.condition}
                  style={{ width: '30px', height: '30px' }}
                />
                <span style={tempLabelStyle}>{point.temperature}°C</span>
              </div>
            </OverlayView>
            
            {selectedPoint === point && (
              <InfoWindow
                position={{ lat: point.lat, lng: point.lng }}
                onCloseClick={() => setSelectedPoint(null)}
              >
                <div className="p-2">
                  <h3 className="font-semibold text-lg">{point.city}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {point.temperature}°C
                    </span>
                    <span className="text-gray-600">
                      {point.condition}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Humidity: {point.humidity}%</p>
                    <p>Wind: {point.windSpeed} km/h</p>
                  </div>
                </div>
              </InfoWindow>
            )}
          </div>
        ))}
      </GoogleMap>
    </div>
  );
};

export default WeatherMap;