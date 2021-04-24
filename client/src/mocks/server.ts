import { createServer } from 'miragejs';
import { activities, activity, filters, signedUrl } from './data';
import { stats } from './data/stats';

export default function makeServer() {
  createServer({
    routes() {
      this.get(
        '/activities',
        (_, request) => {
          const { page, pageSize = 5, type } = request.queryParams;
          const startIndex = (+page - 1) * +pageSize;

          let data = activities.data.concat();
          if (type) {
            data = data.filter((activity) => activity.type === type);
          }

          return {
            total: data.length,
            data: data.slice(startIndex, startIndex + +pageSize),
          };
        },
        { timing: 1000 }
      );

      this.get('/activities/stats', () => stats);
      this.get('/activities/:id', () => activity);
      this.get('/filters', () => filters);

      this.get('/upload', () => signedUrl);
      this.put('/upload/activity');

      this.passthrough('https://api.mapbox.com/**');
      this.passthrough('https://events.mapbox.com/**');
    },
  });
}
