

import {
    FETCH_PHOTOS_STARTED,
    FETCH_PHOTOS_ERRORED,
    FETCH_PHOTOS_FINISHED,
  } from './actions';
  

  const photoReducer = (state = {
    photoData: null,
    photoLoading: false,
    photoError: null,
  }, action) => {
    switch (action.type) {
      case FETCH_PHOTOS_STARTED:
        console.log(`reducers.js - FETCH_PHOTOS_STARTED`);
        return {
            state,
            photoLoading: true,
            photoData: null,
        }
      case FETCH_PHOTOS_FINISHED:
        console.log(`reducers.js - FETCH_PHOTOS_FINISHED`);
        return {
            state,
            photoLoading: false,
            photoData: action.payload,
        }
      case FETCH_PHOTOS_ERRORED:
        console.log(`reducers.js - FETCH_PHOTOS_ERRORED`); 
        return {
            state,
            photoLoading: false,
            photoData: null,
        }
      default:
        return state;
    }
  };
  
  export default photoReducer;