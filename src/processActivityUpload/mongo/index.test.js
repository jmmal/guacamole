const { writeActivity } = require('.');

test.skip('can write an activity to the db', async () => {
  const result = await writeActivity({ title: 'Test 1' });

  expect(result).toBeTruthy
})