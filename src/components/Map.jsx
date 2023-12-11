import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import useGeolocation from "../hooks/useGeolocation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../hooks/useUrlPosition";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { lat, lng } = useUrlPosition();
  const { cities } = useCities();
  const {
    isLoading: isLoadingGeoCoding,
    position: positionGeoCoding,
    getPosition,
  } = useGeolocation();

  function handleGetCurrentPostion(e) {
    e.preventDefault();
    getPosition();
  }

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (positionGeoCoding.lat && positionGeoCoding.lng)
      setMapPosition([positionGeoCoding.lat, positionGeoCoding.lng]);
  }, [positionGeoCoding]);

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
          noWrap={true}
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}

        <Button type="position" onClick={handleGetCurrentPostion}>
          {!isLoadingGeoCoding ? "use current location" : "loading..."}
        </Button>
        <ChangeCenter position={mapPosition} />
        <ClickDetect />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}

function ClickDetect() {
  const navigate = useNavigate();

  useMapEvent({
    click(e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
