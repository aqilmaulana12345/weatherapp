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

  // Icons for weather details with animations
  const getWeatherIcon = (type) => {
    const icons = {
      temperature: { emoji: '🌡️', anim: 'anim-temp' },
      humidity: { emoji: '💧', anim: 'anim-humidity' },
      wind: { emoji: '🌬️', anim: 'anim-wind' },
      pressure: { emoji: '💨', anim: 'anim-pressure' },
      visibility: { emoji: '👀', anim: 'anim-visibility' },
      sunrise: { emoji: '🌅', anim: 'anim-sun-cycle' },
      sunset: { emoji: '🌇', anim: 'anim-sun-cycle' }
    };

    const current = icons[type] || { emoji: '🔹', anim: 'anim-default' };

    return (
      <span className={`detail-icon-anim ${current.anim}`}>
        {current.emoji}
      </span>
    );
  };

  const weatherCondition = weatherData ? weatherData.weather[0].main.toLowerCase() : 'default';

  return (
    <div className={`weather-checker bg-${weatherCondition}`}>
      <h1 className="title">Weather Checker</h1>
      
      <div className="controls">
        <label htmlFor="city" className="label">Pilih Kota: </label>
        <select id="city" value={city} onChange={handleCityChange} className="select-city">
          <option value="Jakarta">Jakarta</option>
          <option value="Surabaya">Surabaya</option>
          <option value="Bandung">Bandung</option>
          <option value="Medan">Medan</option>
          <option value="Yogyakarta">Yogyakarta</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Mengambil data cuaca...</p>
        </div>
      ) : weatherData ? (
        <div className="weather-info fade-in-up" key={weatherData.name}>
          <h2 className="city-name">Cuaca di {weatherData.name}</h2>
          
          <div className={`weather-icon-wrapper ${weatherCondition}`}>
            {weatherData.weather[0].main === "Clear" && (
              <div className="animated-sun">
                <div className="sun-rays"></div>
                <div className="sun-core"></div>
              </div>
            )}

            {weatherData.weather[0].main === "Clouds" && (
              <div className="animated-cloud">
                <div className="cloud-back">☁️</div>
         
              </div>
            )}

            {(weatherData.weather[0].main === "Rain" ||
              weatherData.weather[0].main === "Drizzle") && (
              <div className="animated-rain">
                <div className="rain-cloud">☁️</div>
                <div className="rain-drops">
                  <span className="drop d1">💧</span>
                  <span className="drop d2">💧</span>
                  <span className="drop d3">💧</span>
                </div>
              </div>
            )}

            {weatherData.weather[0].main === "Thunderstorm" && (
              <div className="animated-storm">
                <div className="storm-cloud">⛈️</div>
                <div className="lightning">⚡</div>
              </div>
            )}

            {weatherData.weather[0].main === "Snow" && (
              <div className="animated-snow">
                <span className="flake f1">❄️</span>
                <span className="flake f2">❄️</span>
                <span className="flake f3">❄️</span>
              </div>
            )}

            {["Mist", "Fog", "Haze", "Smoke"].includes(weatherData.weather[0].main) && (
              <div className="animated-fog">
                <div className="fog-layer fog-1">🌫️</div>
              
              </div>
            )}
          </div>

          <div className="weather-details">
            <p className="weather-detail" style={{ '--delay': '0.1s' }}>
              <span className="icon">{getWeatherIcon('temperature')}</span>
              <strong>Temperatur:</strong> {weatherData.main.temp}°C
            </p>
            <p className="weather-detail" style={{ '--delay': '0.15s' }}>
              <span className="icon">{getWeatherIcon('wind')}</span>
              <strong>Kondisi:</strong> {weatherData.weather[0].description}
            </p>
            <p className="weather-detail" style={{ '--delay': '0.2s' }}>
              <span className="icon">{getWeatherIcon('humidity')}</span>
              <strong>Kelembapan:</strong> {weatherData.main.humidity}%
            </p>
            <p className="weather-detail" style={{ '--delay': '0.25s' }}>
              <span className="icon">{getWeatherIcon('wind')}</span>
              <strong>Kecepatan Angin:</strong> {weatherData.wind.speed} m/s
            </p>
            <p className="weather-detail" style={{ '--delay': '0.3s' }}>
              <span className="icon">{getWeatherIcon('pressure')}</span>
              <strong>Tekanan Udara:</strong> {weatherData.main.pressure} hPa
            </p>
            <p className="weather-detail" style={{ '--delay': '0.35s' }}>
              <span className="icon">{getWeatherIcon('visibility')}</span>
              <strong>Jarak Pandang:</strong> {(weatherData.visibility / 1000).toFixed(1)} km
            </p>
            <p className="weather-detail" style={{ '--delay': '0.4s' }}>
              <span className="icon">{getWeatherIcon('sunrise')}</span>
              <strong>Matahari Terbit:</strong> {formatTime(weatherData.sys.sunrise)}
            </p>
            <p className="weather-detail" style={{ '--delay': '0.45s' }}>
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