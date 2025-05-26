import React, { useState, useEffect, useCallback } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../../services/weatherService";
import { getImageByQuery } from "../../services/unsplashService";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocalTime = (timezone) => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // UTC em ms
    const localTime = new Date(utcTime + timezone * 1000);
    return localTime.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchWeather = useCallback(async (queryCity) => {
    if (!queryCity.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(queryCity.trim());
      setWeather(data);

      const imageQuery = `${data.name} ${data.weather[0].description}`;
      const imageUrl = await getImageByQuery(imageQuery);
      setBackgroundImage(imageUrl);
    } catch (error) {
      setError("Não foi possível buscar o clima para essa cidade.");
      setWeather(null);
      setBackgroundImage(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLoading(true);
          setError(null);
          try {
            const { latitude, longitude } = position.coords;
            const data = await getWeatherByCoords(latitude, longitude);
            setWeather(data);

            const imageQuery = `${data.name} ${data.weather[0].description}`;
            const imageUrl = await getImageByQuery(imageQuery);
            setBackgroundImage(imageUrl);
          } catch (error) {
            fetchWeather("Rio de Janeiro");
          } finally {
            setLoading(false);
          }
        },
        () => {
          fetchWeather("Rio de Janeiro");
        }
      );
    } else {
      fetchWeather("Rio de Janeiro");
    }
  }, [fetchWeather]);

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-gray-800"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div className="bg-black bg-opacity-80 rounded-lg p-6">
        <input
          className="border-none outline-none p-2 rounded-full w-80 bg-[#7c7c7c2b] text-white w-[calc(100% - 100px)]"
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather(city);
            }
          }}
        />
        <button
          className="border-none outline-none p-2 ml-4 rounded-3xl bg-[#7c7c7c2b] cursor-pointer text-white"
          onClick={() => fetchWeather(city)}
        >
          <FaMagnifyingGlass />
        </button>

        <div className="mt-7 max-w-md w-[95%]">
          <h2 className="text-white text-2xl">
            Tempo em {weather ? weather.name : "—"}
          </h2>

          {loading ? (
            <p className="text-white mt-5">Carregando...</p>
          ) : error ? (
            <p className="text-red-400 mt-5">{error}</p>
          ) : weather ? (
            <>
              <p className="text-white text-xl mt-5">
                {Math.round(weather.main.temp)}°C
              </p>

              <div className="flex items-center mt-5">
                <img
                  className="w-14 h-14"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p className="text-white text-base ml-3 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>

              <p className="text-white text-base mt-5">
                Hora local: {getLocalTime(weather.timezone)}
              </p>
              <p className="text-white text-base ">
                Umidade: {weather.main.humidity}%
              </p>
            </>
          ) : (
            <p className="text-white mt-5">
              Digite uma cidade para buscar o clima.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
