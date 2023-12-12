import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
function CityList() {
  const { cities } = useCities();
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
