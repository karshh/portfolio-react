import { useEffect, useRef, useState } from "react";
import type { MapInfo } from "~/lib/data.server";

export function CalgaryMap({ title, items, showStarted = false }: { title: string; items: MapInfo[]; showStarted?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    let disposed = false;
    let map: import("leaflet").Map | undefined;
    void import("leaflet").then((module) => {
      if (disposed || !container.current) return;
      const L = module.default;
      map = L.map(container.current, { center: [51.0486, -114.0516], zoom: 10 });
      const pane = map.getPane("tilePane");
      if (pane) pane.style.filter = "grayscale(1) contrast(.9) brightness(1.08)";
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
      const bounds = L.latLngBounds([]);
      for (const item of items) {
        const content = document.createElement("div");
        const location = document.createElement("strong");
        const description = document.createElement("p");
        location.textContent = item.location; description.textContent = item.description;
        content.append(location, description);
        if (showStarted) { const started = document.createElement("p"); started.textContent = `Started: ${new Date(item.created).toLocaleString()}`; content.append(started); }
        L.circleMarker([item.latitude, item.longitude], { radius: 7, color: "#fff", weight: 2, fillColor: "#dc3545", fillOpacity: .9 }).bindPopup(content).addTo(map);
        bounds.extend([item.latitude, item.longitude]);
      }
      if (bounds.isValid()) map.fitBounds(bounds.pad(.2), { maxZoom: 14 });
      setReady(true);
    });
    return () => { disposed = true; map?.remove(); };
  }, [items, showStarted]);
  return <section><h3 className="text-center">{title}</h3><div className="map-shell">
    {!ready && <p className="map-message" role="status">Loading {title.toLowerCase()}…</p>}
    {ready && items.length === 0 && <p className="map-message">No {title.toLowerCase()} to display.</p>}
    <div ref={container} className="leaflet-map" data-testid="leaflet-map" aria-label={`${title} map`} />
  </div></section>;
}
