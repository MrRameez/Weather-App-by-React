import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Correct import from SweetAlert2
import Loading from "./Loading"; // Correct import from Loading.jsx

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      });
    }
  }, []);

  const getWeatherByLocation = (lat, lon) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1f136667cfcdb418bf8b7a4c5a542f00`
    )
      .then((res) => res.json())
      .then((res) => {
        setCurrentWeather(res);
        setCity(res.name);
        setIcon(res.weather[0].icon);
      })
      .catch(() => {
        Swal.fire("Error", "Unable to fetch weather data.", "error");
      })
      .finally(() => setIsLoading(false));
  };

  const getWeatherByCity = () => {
    if (!city.trim()) {
      Swal.fire("Enter the location", "Please enter a location.", "warning");
      return;
    }

    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f136667cfcdb418bf8b7a4c5a542f00`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.cod === 200) {
          setCurrentWeather(res);
          setIcon(res.weather[0].icon);
          setCity(""); // Clear input after successful fetch
        } else {
          Swal.fire("Enter a valid location", "Please enter a valid location.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Unable to fetch weather data.", "error");
      })
      .finally(() => setIsLoading(false));
  };

  const temp = currentWeather ? Math.round(currentWeather.main.temp - 273.15) : "";
  const feelsLike = currentWeather ? Math.round(currentWeather.main.feels_like - 273.15) : "";
  const weatherCondition = currentWeather?.weather[0]?.main;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-500 to-indigo-600 text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Weather App</h1>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-white bg-transparent text-white rounded-lg px-4 py-2 mr-2"
        />
        <button
          onClick={getWeatherByCity}
          className="bg-white text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition"
        >
          Get Weather
        </button>
      </div>

      {isLoading ? (
        <Loading />  
      ) : currentWeather ? (
        <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 w-full max-w-xs">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Temperature</h2>
            <h2 className="text-xl">{temp}°C</h2>
          </div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Feels Like</h2>
            <h2 className="text-xl">{feelsLike}°C</h2>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Weather</h2>
            <img src={iconUrl} alt={weatherCondition} className="w-12 h-12" />
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

export default App;
