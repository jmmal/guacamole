import { getById } from './get';

test.skip('can fetch an activity from the db', async () => {
  const activity = await getById("60723ecc74a7380005cf379e");

  expect(activity).toBeTruthy();
});