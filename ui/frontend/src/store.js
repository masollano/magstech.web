import { createStore, applyMiddleware } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {};

const middleware = [thunk];

// const store = configureStore({
//     reducer: rootReducer,
//     initialState,
//     middleware: composeWithDevTools(applyMiddleware(...middleware))
//   });

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) // Enhance store with DevTools
  );


// const store = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
//     middleware: getDefaultMiddleware =>
//       getDefaultMiddleware().concat(middleware),
//     enhancers: [composeWithDevTools()], // Enhance store with DevTools
//   });


export default store;

