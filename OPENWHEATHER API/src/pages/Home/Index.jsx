import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiRaining } from "react-icons/gi";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-gray-800">
      <div className="bg-black bg-opacity-80 rounded-lg p-6  ">
        <input
          className="border-none outline-none p-2 rounded-full w-80 bg-[#7c7c7c2b] text-white w-[calc(100% - 100px)]"
          type="text"
          placeholder="Digite o nome da cidade"
        />
        <button className="border-none outline-none p-2 ml-4 rounded-3xl bg-[#7c7c7c2b] cursor-pointer float- text-white  ">
          <FaMagnifyingGlass />
        </button>
        <div className="mt-7">
          <h2 className="text-white text-2xl max-w-md w-[95%]">
            Tempo em Rio de Janeiro
          </h2>
          <p className="text-white  text-xl mt-5">25°C</p>
          <div className="flex items-center mt-5">
            <GiRaining className="text-white" />
            <p className="text-white text-base ml-3">Nublado</p>
          </div>
          <p className="text-white text-base mt-5">Umidade: 76%</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
