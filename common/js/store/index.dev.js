import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';

export default function configureStore(initialState) {
  /* Middleware
   * Configure this array with the middleware that you want included. thunk
   * is included by default, and react-router-redux's syncHistory is also
   * applied if an `options.history` object was passed to configureStore.
   */
  let middleware = [thunk];

  // Add universal enhancers here
  let enhancers = [
    DevTools.instrument()
  ];

  const enhancer = compose(...[
    applyMiddleware(...middleware),
    ...enhancers
  ]);

  // create store with enhancers, middleware, reducers, and initialState
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
