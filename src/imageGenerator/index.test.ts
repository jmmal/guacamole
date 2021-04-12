import { getImage } from "./index";

import { points } from './polyline';

test('getImage should work', () => {
  const buffer = getImage(points);

  expect(buffer).toBeTruthy();
});