import { getActivities } from './get';

test('can fetch an activity from the db', async () => {
  const activities = await getActivities();

  expect(activities.length).toBe(10);
});