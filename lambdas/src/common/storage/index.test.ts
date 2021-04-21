import { getUploadURL } from './index';

describe('getUploadURL()', () => {
  test.skip('works', async () => {
    const result = await getUploadURL('2021-04-21_17-05-56_hk_1618988756.fit');

    expect(result).toBeTruthy();
  });
});
