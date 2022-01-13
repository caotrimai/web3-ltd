import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import history from './history';
import rootReducer from './rootReducer';

const router = routerMiddleware(history);

function configureAppStore(preloadedState) {
  const middlewares = [router];

  /* istanbul ignore if  */
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export default configureAppStore()