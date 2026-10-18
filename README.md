# Skycast — Weather Report App

A responsive React weather application that searches any city and displays current weather using OpenWeatherMap and Axios.

## Requirements
- Node.js and npm
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

## Setup

1. Extract this project folder.
2. Open a terminal inside `weather-report-app`.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to a new file named `.env`.
5. Open `.env` and replace the placeholder with your API key:

   ```env
   REACT_APP_WEATHER_API_KEY=your_actual_api_key
   ```

6. Start the React development server:

   ```bash
   npm start
   ```

7. Visit `http://localhost:3000`.

If you change `.env` while the server is running, stop and restart `npm start`. New OpenWeatherMap API keys may take a little time to become active.

## Features
- Search weather by city
- Current temperature in Celsius and feels-like temperature
- Weather condition and matching emoji
- Humidity, wind speed, pressure, and cloudiness
- Loading state and helpful errors for empty input, unknown cities, invalid API keys, and network failures
- Responsive layout using CSS Grid, Flexbox, and media queries

## Project structure

```text
weather-report-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── Weather.js
│   ├── index.js
│   └── styles.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API endpoint
The app uses:

`https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`

The city is URL-encoded and inserted dynamically with a JavaScript template literal. `units=metric` returns temperatures in Celsius.

## Security note
The `REACT_APP_` environment variable is included in the browser bundle, so it is not a secret in a deployed client-side app. Do not commit `.env` to GitHub. For a public production deployment, proxy the API request through a backend to protect the key.
