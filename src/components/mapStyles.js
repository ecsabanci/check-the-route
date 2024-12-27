export const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

export const defaultCenter = {
  lat: 39.9334,
  lng: 32.8597
};

export const createMarkerContainerStyle = (isDarkMode) => ({
  backgroundColor: isDarkMode ? '#ffffff' : '#242f3e',
  padding: '4px',
  borderRadius: '8px',
  border: '1px solid #666',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  width: '40px',
  height: '60px',
});

export const createTempLabelStyle = (isDarkMode) => ({
  color: isDarkMode ? '#000000' : '#ffffff',
  fontSize: '12px',
  fontWeight: 'bold',
});

export const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4f5964" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#4f5964" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#3c4653" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
]; 