import { useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function weatherEmoji(condition = "") {
  const value = condition.toLowerCase();
  if (value.includes("thunder")) return "⛈️";
  if (value.includes("drizzle")) return "🌦️";
  if (value.includes("rain")) return "🌧️";
  if (value.includes("snow")) return "❄️";
  if (value.includes("cloud")) return "☁️";
  if (value.includes("mist") || value.includes("fog") || value.includes("haze")) return "🌫️";
  if (value.includes("clear")) return "☀️";
  return "🌤️";
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather(event) {
    event.preventDefault();
    const cityName = city.trim();

    if (!cityName) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    if (!API_KEY || API_KEY === "your_openweathermap_api_key_here") {
      setError("API key missing. Add your OpenWeatherMap key to the .env file and restart the app.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (requestError) {
      if (requestError.response?.status === 404) {
        setError("We couldn't find that city. Check the spelling and try again.");
      } else if (requestError.response?.status === 401) {
        setError("The API key is invalid or not active yet. Check your OpenWeatherMap account.");
      } else {
        setError("Weather data couldn't be loaded. Check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="weather-widget" aria-label="Weather search">
      <form className="search-form" onSubmit={searchWeather}>
        <label className="sr-only" htmlFor="city-search">City name</label>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="city-search"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search a city, e.g. Coimbatore"
          autoComplete="off"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <p className="error-message" role="alert">{error}</p>}

      {!weather && !error && (
        <div className="empty-state">
          <div className="empty-sun" aria-hidden="true">☀</div>
          <p className="empty-title">A little weather insight</p>
          <p className="empty-copy">Enter a city above to see current conditions.</p>
        </div>
      )}

      {weather && (
        <article className="weather-card" aria-live="polite">
          <div className="weather-card-top">
            <div>
              <p className="location-label">CURRENT WEATHER</p>
              <h2>{weather.name}<span>{weather.sys?.country ? `, ${weather.sys.country}` : ""}</span></h2>
              <p className="condition">{weather.weather?.[0]?.description}</p>
            </div>
            <div className="weather-emoji" aria-label={weather.weather?.[0]?.main}>
              {weatherEmoji(weather.weather?.[0]?.main)}
            </div>
          </div>

          <div className="temperature-row">
            <p className="temperature">{Math.round(weather.main.temp)}<span>°C</span></p>
            <div className="feels-like">
              <span>FEELS LIKE</span>
              <strong>{Math.round(weather.main.feels_like)}°C</strong>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-symbol">💧</span>
              <div><span className="detail-label">Humidity</span><strong>{weather.main.humidity}%</strong></div>
            </div>
            <div className="detail-item">
              <span className="detail-symbol">💨</span>
              <div><span className="detail-label">Wind speed</span><strong>{weather.wind.speed} m/s</strong></div>
            </div>
            <div className="detail-item">
              <span className="detail-symbol">🌡️</span>
              <div><span className="detail-label">Pressure</span><strong>{weather.main.pressure} hPa</strong></div>
            </div>
            <div className="detail-item">
              <span className="detail-symbol">☁️</span>
              <div><span className="detail-label">Cloudiness</span><strong>{weather.clouds?.all ?? 0}%</strong></div>
            </div>
          </div>
          <p className="updated-note">Live conditions for {weather.name}</p>
        </article>
      )}
    </section>
  );
}