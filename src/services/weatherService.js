import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeatherByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const response = await axios.get(url);
  return response.data;
};
