import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getWeatherByCity } from "../../services/weatherService";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // Para controlar o loading

  // Função para buscar o clima
  const fetchWeather = async (queryCity) => {
    if (!queryCity.trim()) return;

    setLoading(true);
    try {
      const data = await getWeatherByCity(queryCity.trim());
      setWeather(data);
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Busca Rio de Janeiro ao carregar a página
  useEffect(() => {
    fetchWeather("Rio de Janeiro");
  }, []);

  // Função para deixar primeira letra maiúscula
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-gray-800">
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

        <div className="mt-7">
          <h2 className="text-white text-2xl max-w-md w-[95%]">
            Tempo em {weather ? weather.name : "—"}
          </h2>
          <p className="text-white text-xl mt-5">
            {weather ? Math.round(weather.main.temp) + "°C" : "-- °C"}
          </p>
          <div className="flex items-center mt-5">
            {loading ? (
              <p className="text-white text-base ml-3">Carregando...</p>
            ) : weather ? (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-14 h-14"
                />
                <p className="text-white text-base ml-3 capitalize">
                  {capitalizeFirstLetter(weather.weather[0].description)}
                </p>
              </>
            ) : (
              <p className="text-white text-base ml-3">
                Nenhum dado disponível
              </p>
            )}
          </div>
          <p className="text-white text-base mt-5">
            Umidade: {weather ? weather.main.humidity + "%" : "--"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
