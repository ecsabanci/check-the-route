export const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

export const defaultCenter = {
  lat: 39.9334,
  lng: 32.8597
};

export const createMarkerContainerStyle = (isDarkMode) => ({
    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', // for Safari support
    padding: '4px',
    borderRadius: '8px',
    border: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.2)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: isDarkMode
      ? '0 4px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      : '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    width: '40px',
    height: '60px',
  });

export const createTempLabelStyle = (isDarkMode) => ({
  color: isDarkMode ? '#ffffff' : 'rgb(100, 100, 100, 1)',
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