import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
import useGeolocation from "../hooks/useGeoLocation";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import User from "./User";
function Map() {
  const { cities } = useCities();
  const { lat, lng } = useUrlPosition();
  const {
    isLoading: isLoadingGeoCoding,
    position: positionGeoCoding,
    getPosition: getPositionGeoCoding,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([0, 40]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (positionGeoCoding.lat && positionGeoCoding.lng)
      setMapPosition([positionGeoCoding.lat, positionGeoCoding.lng]);
  }, [positionGeoCoding.lat, positionGeoCoding.lng]);

  const handleGetPosition = () => {
    getPositionGeoCoding();
  };

  return (
    <div className={styles.mapContainer}>
      <User />
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <ClickDetect />
        {!positionGeoCoding.lat && (
          <Button type="position" onClick={handleGetPosition}>
            {isLoadingGeoCoding ? "loading..." : "use your position"}
          </Button>
        )}
      </MapContainer>
    </div>
  );
}

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
};

const ClickDetect = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
};

export default Map;
