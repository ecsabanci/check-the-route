import { 
  GoogleMap, 
  Polyline, 
  InfoWindow,
  OverlayView
} from '@react-google-maps/api';
import { useState } from 'react';
import {
  mapContainerStyle,
  defaultCenter,
  createMarkerContainerStyle,
  createTempLabelStyle,
  darkMapStyle
} from './mapStyles';

const WeatherMap = ({ route, weatherPoints, isDarkMode }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const center = route?.center || defaultCenter;
  const markerContainerStyle = createMarkerContainerStyle(isDarkMode);
  const tempLabelStyle = createTempLabelStyle(isDarkMode);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-fit">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={{
          styles: isDarkMode ? [...darkMapStyle] : [],
          disableDefaultUI: true,
          zoomControl: true,
        }}
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