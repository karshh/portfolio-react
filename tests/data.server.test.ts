import { afterEach, describe, expect, it, vi } from "vitest";
import { getDetours, getNews, getTraffic, getWeather } from "../app/lib/data.server";

function mockJson(value: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 503, json: async () => value });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => vi.unstubAllGlobals());

describe("server data adapters", () => {
  it("selects the newest valid Calgary weather observation", async () => {
    mockJson({ features: [
      { properties: { "msc_id-value": "wrong", "air_temp-uom": "°C", air_temp: 99, "date_tm-value": "2026-11-12T11:00:00Z" } },
      { properties: { "msc_id-value": "3031094", "air_temp-uom": "°C", air_temp: 4.2, "date_tm-value": "2026-11-12T10:00:00Z", "stn_nam-value": "Calgary International CS" } },
      { properties: { "msc_id-value": "3031094", "air_temp-uom": "°C", air_temp: 6.1, "date_tm-value": "2026-11-12T11:00:00Z", "stn_nam-value": "Calgary International CS" } },
    ] });
    await expect(getWeather(new Date("2026-11-12T12:00:00Z"))).resolves.toMatchObject({ temperatureC: 6.1, station: "Calgary International CS" });
  });

  it("rejects stale weather instead of showing misleading data", async () => {
    mockJson({ features: [{ properties: { "msc_id-value": "3031094", "air_temp-uom": "°C", air_temp: 1, "date_tm-value": "2026-11-12T08:00:00Z" } }] });
    await expect(getWeather(new Date("2026-11-12T12:00:00Z"))).rejects.toThrow("No recent Calgary observation");
  });

  it("filters unsafe and non-news links while preserving Calgary-local timestamps", async () => {
    mockJson([
      { title: "City of Calgary Newsroom", pubdate: "2026-11-12T10:00:00", link: "https://newsroom.calgary.ca/" },
      { title: "Unsafe", pubdate: "2026-11-12T11:00:00", link: "http://example.com/story" },
      { title: "Actual story", pubdate: "2026-11-12T12:00:00", link: "https://newsroom.calgary.ca/story/" },
    ]);
    await expect(getNews()).resolves.toEqual([{ title: "Actual story", pubdate: "2026-11-12T12:00:00", href: "https://newsroom.calgary.ca/story/" }]);
  });

  it("maps valid traffic incidents and drops malformed coordinates", async () => {
    mockJson([
      { description: "Memorial Drive", incident_info: "Collision", latitude: "51.05", longitude: "-114.07", start_dt_utc: "2026-11-12T10:00:00" },
      { description: "Invalid", incident_info: "Collision", latitude: "not-a-number", longitude: "-114", start_dt_utc: "2026-11-12T10:00:00" },
    ]);
    await expect(getTraffic(new Date("2026-11-12T12:00:00Z"))).resolves.toEqual([{ location: "Memorial Drive", description: "Collision", latitude: 51.05, longitude: -114.07, created: "2026-11-12T10:00:00.000Z" }]);
  });

  it("queries detours using permanent UTC−6 Alberta time", async () => {
    const fetchMock = mockJson([{ description: "5 Street", construction_info: "Closure", latitude: "51.04", longitude: "-114.08", start_dt: "2026-11-12T01:00:00" }]);
    await getDetours(new Date("2026-11-12T12:00:00Z"));
    const requested = new URL(fetchMock.mock.calls[0][0] as URL);
    expect(requested.searchParams.get("$where")).toContain("2026-11-12T06:00:00");
  });

  it("surfaces upstream failures", async () => {
    mockJson({}, false);
    await expect(getNews()).rejects.toThrow("Upstream returned 503");
  });
});
