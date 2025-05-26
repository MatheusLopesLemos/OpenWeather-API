import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getWeatherByCity } from "../../services/weatherService";
import { getImageByQuery } from "../../services/unsplashService";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Função para buscar o clima e a imagem
  const fetchWeather = async (queryCity) => {
  if (!queryCity.trim()) return;

    try {
      const data = await getWeatherByCity(queryCity.trim());
      setWeather(data);

      // Busca imagem baseada no nome da cidade e no clima
      const imageQuery = `${data.name} ${data.weather[0].description}`;
      const imageUrl = await getImageByQuery(imageQuery);
      setBackgroundImage(imageUrl);
    } catch (error) {
      console.error("Erro ao buscar o clima ou imagem:", error);
    }
  };

  const getLocalTime = (timezone) => {
    const now = new Date();
    const localTime = new Date(now.getTime() + timezone * 1000);
    return localTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };


  // Buscar clima e imagem ao carregar a página
  useEffect(() => {
    fetchWeather("Rio de Janeiro");
  }, []);

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

        <div className="mt-7">
          <h2 className="text-white text-2xl max-w-md w-[95%]">
            Tempo em {weather ? weather.name : "—"}
          </h2>
          <p className="text-white text-xl mt-5">
            {weather ? Math.round(weather.main.temp) + "°C" : "-- °C"}
          </p>
          <div className="flex items-center mt-5">
            {weather ? (
              <>
                <img
                  className="w-14 h-14"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p className="text-white text-base ml-3 capitalize">
                  {weather.weather[0].description}
                </p>
              </>
            ) : (
              <p className="text-white text-base ml-3">Carregando...</p>
            )}
          </div>
          <p className="text-white text-base mt-5">
            Hora local: {weather ? getLocalTime(weather.timezone): "--:--"}
          </p>
          <p className="text-white text-base ">
            Umidade: {weather ? weather.main.humidity + "%" : "--"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
