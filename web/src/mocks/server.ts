import { createServer } from "miragejs";
import { activities, activity, filters } from "./data";

createServer({
  routes() {
    this.get("/activities", (_, request) => {
      const { page, pageSize = 5 } = request.queryParams;
      const startIndex = (+page - 1) * (+pageSize);

      return {
        total: activities.data.length,
        data: activities.data.slice(startIndex, startIndex + +pageSize)
      };
    });
    this.get("/activities/:id", () => activity);
    this.get("/filters", () => filters);

    this.passthrough("https://api.mapbox.com/**");
    this.passthrough("https://events.mapbox.com/**");
  },
});
