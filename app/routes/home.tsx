import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { getWeather } from "~/lib/data.server";
import { formatCalgaryTime } from "~/lib/time";

export async function loader() {
  try { return { weather: await getWeather(), weatherError: false }; }
  catch { return { weather: null, weatherError: true }; }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const update = () => setClock(formatCalgaryTime(new Date()));
    update();
    const timer = window.setInterval(update, 500);
    return () => window.clearInterval(timer);
  }, []);
  return <>
    <section className="top-content">
      <div className="container text-center">
        <h3>{"{ name = Karsh }"}</h3><br />
        <p>Welcome to my corner.</p>
        <p>Here, I document my journey dedicated to excelling as a full-stack developer.</p>
        <p>Check out my <a href="https://www.linkedin.com/in/karshsharma">linkedin</a> and <a href="https://github.com/karshh">github</a> profile.</p><br />
        <div className="row">
          <div className="col-4"><p>⌖ Calgary, AB</p></div>
          <div className="col-4"><p>◷ <span role="timer" aria-label="Calgary time" data-testid="calgary-clock">{clock || "Loading…"}</span></p></div>
          <div className="col-4">
            <p>♨ {loaderData.weather ? <span data-testid="temperature" title={`${loaderData.weather.station} · Observed ${loaderData.weather.observedAt}`}>{loaderData.weather.temperatureC.toFixed(1)} °C</span> : <span>Weather unavailable</span>}</p>
            <small className="weather-source">Data source: <a href="https://eccc-msc.github.io/open-data/licence/readme_en/" target="_blank" rel="noreferrer">Environment and Climate Change Canada</a></small>
          </div>
        </div><br /><br />
        <img draggable={false} className="banner" src="/assets/img/calgary.svg" alt="Calgary skyline" />
      </div>
    </section>
    <section className="middle-content">
      <div className="container"><div className="row justify-center">
        <div className="col-8">
          <p>✓ React 19.3</p><p>✓ React Router framework mode with server rendering.</p><p>✓ Component-oriented TypeScript architecture.</p>
          <p>✓ Server-backed Environment Canada and City of Calgary data.</p><p>✓ Leaflet maps with OpenStreetMap.</p><p>✓ Protected server-side contact delivery.</p>
        </div>
        <div className="col-4 text-center"><div className="tech-panel" aria-label="React">⚛</div></div>
      </div></div>
    </section>
  </>;
}
