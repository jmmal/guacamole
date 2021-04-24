import {
  getActivityTypeAggregations,
  getById,
  getLightweightActivities,
} from './get';

test.skip('can fetch an activity from the db', async () => {
  const activity = await getById('60723ecc74a7380005cf379e');

  expect(activity).toBeTruthy();
});

test.skip('can fetch activity aggregations correctly', async () => {
  const aggregations = await getActivityTypeAggregations();

  expect(aggregations).toBeTruthy();
});

test.skip('should fetch ligthweight activities', async () => {
  const activities = await getLightweightActivities();

  console.log(activities);

  expect(activities.length).toBeGreaterThan(0);
});
