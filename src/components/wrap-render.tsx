import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import store from '@/stores';

export default function wrapRender(component: ReactElement) {
  return (
    <Provider store={store}>
      {component}
    </Provider>
  );
}
