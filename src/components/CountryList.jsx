import { useCities } from "../contexts/CitiesContext";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
function CountryList() {
  const { isLoading, cities } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.el))
      return [
        ...arr,
        { country: city.country, id: city.id, emoji: city.emoji },
      ];
    else return arr;
  }, []);

  if (isLoading) return <Spinner />;

  if (!countries.length)
    return <Message message="Start by clicking somewhere" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
