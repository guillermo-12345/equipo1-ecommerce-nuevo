import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './StoreLocationMap.css'; // Import del archivo CSS

const StoreLocationMap = () => {
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const storeLocation = {
    lat: -34.603722,
    lng: -58.381592
  };

  // Utiliza la clave API desde el archivo de entorno
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={storeLocation}
          zoom={15}
        >
          <Marker position={storeLocation} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default StoreLocationMap;
