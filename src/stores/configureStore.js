import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
import models from 'models';


export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension
      ? window.devToolsExtension()
      : f => f)(createStore)(rootReducer, initialState);
  for (const model of models) {
    sagaMiddleware.run(model.default);
  }
  return store;
}
