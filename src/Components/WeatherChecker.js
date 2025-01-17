import React, { useEffect, useState } from "react";
import axios from "axios";
import './WeatherChecker.css'; // Untuk styling terpisah

const WeatherChecker = () => {
  const [city, setCity] = useState("Jakarta"); // Kota default
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "b3272ef720878b20079a3e24de31d0b6";

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
  };

  // Format waktu sunrise dan sunset
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
  };

  // Icons for weather details
  const getWeatherIcon = (type) => {
    const icons = {
      temperature: '🌡️',
      humidity: '💧',
      wind: '🌬️',
      pressure: '💨',
      visibility: '👀',
      sunrise: '🌅',
      sunset: '🌇'
    };
    return icons[type] || '🔹'; // Default icon if none match
  };

  return (
    <div className="weather-checker">
      <h1 className="title">Weather Checker</h1>
      <label htmlFor="city" className="label">Pilih Kota: </label>
      <select id="city" value={city} onChange={handleCityChange} className="select-city">
        <option value="Jakarta">Jakarta</option>
        <option value="Surabaya">Surabaya</option>
        <option value="Bandung">Bandung</option>
        <option value="Medan">Medan</option>
        <option value="Yogyakarta">Yogyakarta</option>
      </select>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : weatherData ? (
        <div className="weather-info">
          <h2 className="city-name">Cuaca di {weatherData.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="weather-icon"
          />
         <div className="weather-details">
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('temperature')}</span>
    <strong>Temperatur:</strong> {weatherData.main.temp}°C
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('wind')}</span>
    <strong>Kondisi:</strong> {weatherData.weather[0].description}
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('humidity')}</span>
    <strong>Kelembapan:</strong> {weatherData.main.humidity}%
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('wind')}</span>
    <strong>Kecepatan Angin:</strong> {weatherData.wind.speed} m/s
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('pressure')}</span>
    <strong>Tekanan Udara:</strong> {weatherData.main.pressure} hPa
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('visibility')}</span>
    <strong>Jarak Pandang:</strong> {(weatherData.visibility / 1000).toFixed(1)} km
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('sunrise')}</span>
    <strong>Matahari Terbit:</strong> {formatTime(weatherData.sys.sunrise)}
  </p>
  <p className="weather-detail">
    <span className="icon">{getWeatherIcon('sunset')}</span>
    <strong>Matahari Terbenam:</strong> {formatTime(weatherData.sys.sunset)}
  </p>
</div>

        </div>
      ) : (
        <p className="no-data">Data tidak tersedia</p>
      )}
    </div>
  );
};

export default WeatherChecker;
