// 29b71cb3a7064f5eb0b120607241811 (API_KEY)

import React, { useEffect, useState } from 'react'
import "./index.css"
import Btn from "./assets/search.png"
import humidityIcon from "./assets/humidity.png"
import windIcon from "./assets/wind.png"
import { motion } from "framer-motion";

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)

  function getWeather(e) {
    e.preventDefault();
    fetch(`https://api.weatherapi.com/v1/current.json?key=29b71cb3a7064f5eb0b120607241811&q=${city}&aqi=no`)
      .then((res) => res.json())
      .then((res) => {
        setWeather(res)
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    setCity("")
  }

  return (
    <>
      <div className='bg-[#e2d4ff] min-h-screen flex justify-between items-center'>
        <form onSubmit={getWeather} className='parent bg-gradient-to-bl from-[#2f4680] to-[#500ae4] rounded-xl p-10 w-90 flex flex-col items-center justify-center gap-5 mx-auto'>
          <div className='child-1 flex items-center justify-center gap-3'>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className='h-[45px] border-none outline-none rounded-[40px] pl-[20px] text-[#626262] bg-[#ebfffc] font-[18px]' placeholder='Search Location' id='weather' />
            <img onClick={getWeather} className='w-[45px] cursor-pointer bg-[#ebfffc] rounded-[50%] p-[15px]' src={Btn} alt="btn" />
          </div>

          {weather && (
            <>
              <motion.div
                className='child-2'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <img width={"200px"} src={weather.current.condition.icon} alt="" />
              </motion.div>

              <motion.p
                className='text-white text-5xl leading-10'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {`${Math.round(weather.current.temp_c)}°c`}
              </motion.p>

              <motion.p
                className='text-white text-3xl'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {weather.location.name}
              </motion.p>

              <motion.div
                className='weather-data flex w-full justify-between items-center text-white mt-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <div className='humidity flex items-start text-[22px] gap-3'>
                  <img className='w-[26px] mt-[10px]' src={humidityIcon} alt="" />
                  <div>
                    <p>{`${weather.current.humidity} %`}</p>
                    <span className='block text-[16px]'>Humidity</span>
                  </div>
                </div>

                <div className='wind flex items-start text-[22px] gap-3'>
                  <img className='w-[26px] mt-[10px]' src={windIcon} alt="" />
                  <div>
                    <p>{`${Math.round(weather.current.wind_kph)} kph`}</p>
                    <span className='block text-[16px]'>Wind speed</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default App
