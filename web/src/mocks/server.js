import { createServer } from "miragejs";
import { activities, filters, activity } from "./data";

createServer({
  routes() {
    this.get("/activities/:id", () => activity);
    this.get("/activities", () => activities);
    this.get("/filters", () => filters);

    this.passthrough("https://api.mapbox.com/**");
    this.passthrough("https://events.mapbox.com/**");
  },
});
