import { createServer } from "miragejs";
import { activities, activity, filters } from "./data";

createServer({
  routes() {
    this.get("/activities", (_, request) => {
      const { page, pageSize = 5, type } = request.queryParams;
      const startIndex = (+page - 1) * (+pageSize);

      let data = activities.data.concat();
      if (type) {
        data = data.filter(activity => activity.type === type);
      }

      return {
        total: data.length,
        data: data.slice(startIndex, startIndex + +pageSize)
      };
    });
    this.get("/activities/:id", () => activity);
    this.get("/filters", () => filters);

    this.passthrough("https://api.mapbox.com/**");
    this.passthrough("https://events.mapbox.com/**");
  },
});
