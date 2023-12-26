import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "reject":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknow action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:8001/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "reject" });
      }
    }
    getCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (useCities === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
}

export { useCities, CitiesProvider };
