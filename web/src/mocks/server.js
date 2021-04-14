import { createServer } from "miragejs";
import { activities } from "./data/activities_v2";
import { filters } from './data/filters';

createServer({
  routes() {
    this.get("/activities", () => activities);
    this.get("/filters", () => filters);
  },
});
