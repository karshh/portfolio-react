import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("home", "routes/home.tsx"),
  route("news", "routes/news.tsx"),
  route("sait", "routes/sait.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
