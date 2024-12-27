export const getRoute = async (startPoint, endPoint) => {
  console.info('getRoute',startPoint, endPoint);
  try {
    // First, geocode the start and end points
    const [startGeocode, endGeocode] = await Promise.all([
      geocodeAddress(startPoint),
      geocodeAddress(endPoint)
    ]);

    // Create a promise to handle DirectionsService
    const directionsPromise = new Promise((resolve, reject) => {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: startGeocode,
          destination: endGeocode,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        }
      );
    });

    const result = await directionsPromise;
    
    // Process the route
    const route = {
      path: result.routes[0].overview_path.map(point => ({
        lat: point.lat(),
        lng: point.lng()
      })),
      bounds: result.routes[0].bounds,
      center: {
        lat: (result.routes[0].bounds.getNorthEast().lat() + result.routes[0].bounds.getSouthWest().lat()) / 2,
        lng: (result.routes[0].bounds.getNorthEast().lng() + result.routes[0].bounds.getSouthWest().lng()) / 2
      }
    };

    const waypoints = calculateWaypoints(route.path);

    return {
      route,
      waypoints
    };
  } catch (error) {
    console.error('Error getting route:', error);
    throw error;
  }
};

// Update geocodeAddress to use Google Maps Geocoding Service
const geocodeAddress = async (address) => {
  try {
    const geocoder = new window.google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const { lat, lng } = results[0].geometry.location;
          resolve({ lat: lat(), lng: lng() });
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

// Keep the existing calculateWaypoints and decodePolyline functions...

const processRouteResponse = (data) => {
  if (!data.routes[0]) throw new Error('No route found');

  const route = data.routes[0];
  const path = decodePolyline(route.overview_polyline.points);
  const bounds = route.bounds;

  return {
    path,
    bounds,
    center: {
      lat: (bounds.northeast.lat + bounds.southwest.lat) / 2,
      lng: (bounds.northeast.lng + bounds.southwest.lng) / 2
    }
  };
};

const calculateWaypoints = (path) => {
  // Calculate 8-10 waypoints along the route
  const waypoints = [];
  const numPoints = Math.min(10, Math.max(8, Math.floor(path.length / 100)));
  
  for (let i = 0; i <= numPoints; i++) {
    const index = Math.floor((i * (path.length - 1)) / numPoints);
    waypoints.push(path[index]);
  }

  return waypoints;
};

// Add this function to your mapService.js file
const decodePolyline = (encoded) => {
    const points = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;
  
    while (index < len) {
      let shift = 0;
      let result = 0;
  
      do {
        let b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (result >= 0x20);
  
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
  
      shift = 0;
      result = 0;
  
      do {
        let b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (result >= 0x20);
  
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
  
      points.push({
        lat: lat * 1e-5,
        lng: lng * 1e-5
      });
    }
  
    return points;
  };