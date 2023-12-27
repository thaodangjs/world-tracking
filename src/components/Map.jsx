import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useRef, useState } from "react";
import { useCities } from "../context/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import useGeolocation from "../hooks/useGeoLocation";
import Button from "./Button";
import L from "leaflet";
import User from "./User";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([0, 40]);
  const { lat, lng } = useUrlPosition();
  const {
    isLoading: isLoadingGeoCoding,
    position: positionGeoCoding,
    getPosition: getPositionGeoCoding,
  } = useGeolocation();

  useEffect(
    function () {
      if (!lat || !lng) return;
      setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  function handleGetPosition(e) {
    e.preventDefault();
    getPositionGeoCoding();
  }

  useEffect(
    function () {
      if (!positionGeoCoding.lat || !positionGeoCoding.lng) return;
      setMapPosition([positionGeoCoding.lat, positionGeoCoding.lng]);
    },
    [positionGeoCoding.lat, positionGeoCoding.lng]
  );

  return (
    <div className={styles.mapContainer}>
      <User />
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
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
        <DetectClick />
        <ButtonWrapper>
          {!positionGeoCoding.lat && (
            <Button type="position" onClick={handleGetPosition}>
              {isLoadingGeoCoding ? "loading" : "Use your position"}
            </Button>
          )}
        </ButtonWrapper>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

function ButtonWrapper({ children }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      L.DomEvent.disableClickPropagation(buttonRef.current);
    }
  }, []);
  return children;
}

export default Map;
