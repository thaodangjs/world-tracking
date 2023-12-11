import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

/* eslint-disable react/prop-types */

function CityItem({ city }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  const { emoji, cityName, date, id, position } = city;

  const { currentCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <p className={styles.name}>{cityName}</p>
        <time className={styles.date}>{formatDate(date)}</time>
      </Link>
    </li>
  );
}

export default CityItem;
