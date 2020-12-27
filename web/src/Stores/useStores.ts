import { createContext, useContext } from 'react';

import { ActivityStore } from './ActivityStore';

export const useStores = () => useContext(storeContext);

const storeContext = createContext({
  activityStore: new ActivityStore()
})