import Weather from "./Weather";

export default function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Weather Report home">
          <span className="brand-icon" aria-hidden="true">☀</span>
          <span>sky<span className="brand-accent">cast</span></span>
        </a>
        <span className="topbar-label">LIVE WEATHER</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR WEATHER, AT A GLANCE</p>
        <h1>Find your <span>forecast.</span></h1>
        <p className="hero-copy">Clear skies or rainy days — get the latest weather for any city.</p>
        <Weather />
      </section>

      <footer className="footer">
        <span>Made for curious weather watchers.</span>
        <span>Data provided by OpenWeatherMap</span>
      </footer>
    </main>
  );
}