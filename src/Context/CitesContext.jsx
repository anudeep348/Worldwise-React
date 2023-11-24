import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = `http://localhost:8000`;
const CitesContext = createContext();

function CitesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  // console.log(cites);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert(`There was an error while Loading`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert(`There was an error while Loading`);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cites) => [...cites, data]);
    } catch {
      alert(`There was an error while creating the city`);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cites) => cites.filter((city) => city.id !== id));
    } catch {
      alert(`There was an error while deleting city`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the cites provider");
  return context;
}

export { CitesProvider, useCities };
