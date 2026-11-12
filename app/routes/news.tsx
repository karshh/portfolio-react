import type { Route } from "./+types/news";
import { CalgaryMap } from "~/components/map";
import { getDetours, getNews, getTraffic } from "~/lib/data.server";

export async function loader() {
  const [news, traffic, detours] = await Promise.allSettled([getNews(), getTraffic(), getDetours()]);
  return {
    news: news.status === "fulfilled" ? news.value : [],
    traffic: traffic.status === "fulfilled" ? traffic.value : [],
    detours: detours.status === "fulfilled" ? detours.value : [],
    newsError: news.status === "rejected",
  };
}

function NewsPanel({ item }: { item: Awaited<ReturnType<typeof getNews>>[number] }) {
  const date = new Date(item.pubdate);
  return <a className="news-panel" href={item.href} target="_blank" rel="noreferrer"><h6>{item.title}.</h6><p><small>{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</small></p></a>;
}

export default function News({ loaderData }: Route.ComponentProps) {
  const { news, traffic, detours, newsError } = loaderData;
  return <>
    <section className="container page-content">
      <div className="text-center"><h3>Recent Local News</h3><p>Powered by: <a href="https://newsroom.calgary.ca/">The Calgary Newsroom</a></p></div><hr />
      {newsError ? <div className="text-center error" role="alert">Local news is temporarily unavailable.</div> : <div data-testid="news-list">
        <div className="row"><div className="col-6">{news.slice(0, 1).map((item) => <NewsPanel key={item.href} item={item} />)}</div><div className="col-6">{news.slice(1, 4).map((item) => <NewsPanel key={item.href} item={item} />)}</div></div>
        <div className="row">{news.slice(4, 7).map((item) => <div className="col-4" key={item.href}><NewsPanel item={item} /></div>)}</div>
        <div className="row justify-center">{news.slice(7, 11).map((item) => <div className="col-3" key={item.href}><NewsPanel item={item} /></div>)}</div>
      </div>}<br /><br />
    </section>
    <section className="traffic"><div className="container"><div className="row justify-around">
      <div className="col-6"><CalgaryMap title="Traffic Incidents" items={traffic} showStarted /></div>
      <div className="col-6"><CalgaryMap title="Current Detours" items={detours} /></div>
    </div></div></section>
  </>;
}
