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
import { useCities } from "../contexts/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
import useGeolocation from "../hooks/useGeoLocation";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

import L from "leaflet";

function Map() {
  const { cities } = useCities();
  const { lat, lng } = useUrlPosition();
  const navigate = useNavigate();
  const {
    isLoading: isLoadingGeoCoding,
    position: positionGeoCoding,
    getPosition: getGeoPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  function handleGetPosition(e) {
    e.preventDefault();

    getGeoPosition();
  }

  useEffect(() => {
    if (positionGeoCoding.lat && positionGeoCoding.lng) {
      setMapPosition([positionGeoCoding.lat, positionGeoCoding.lng]);
      navigate(
        `form?lat=${positionGeoCoding.lat}&lng=${positionGeoCoding.lng}`
      );
    }
  }, [positionGeoCoding.lat, positionGeoCoding.lng, navigate]);

  return (
    <div className={styles.mapContainer}>
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
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        {!positionGeoCoding.lat && (
          <ButtonWrapper>
            <Button type="position" onClick={handleGetPosition}>
              {isLoadingGeoCoding ? "loading" : "use your position"}
            </Button>
          </ButtonWrapper>
        )}
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
    click: (e) => {
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

  return <div ref={buttonRef}>{children}</div>;
}

export default Map;
