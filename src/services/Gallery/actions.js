import AVLTreeClass from '../../AVLtree/avltree';

export const FETCH_PHOTOS_STARTED = 'FETCH_PHOTOS_STARTED';
export const FETCH_PHOTOS_ERRORED = 'FETCH_PHOTOS_ERRORED';
export const FETCH_PHOTOS_FINISHED = 'FETCH_PHOTOS_FINISHED';
export const FETCH_PHOTOS_INITIAL = 'FETCH_PHOTOS_INITIAL';

export const PHOTO_URL = 'http://localhost:6680/';

export const requestPhotosStartAction = {
  type: FETCH_PHOTOS_STARTED,
};

export const requestPhotosFinishAction = payload => ({
  type: FETCH_PHOTOS_FINISHED,
  payload
});

export const requestPhotosErrorAction = payload => ({
  type: FETCH_PHOTOS_ERRORED,
  payload,
});

export const initialArrayAction = payload => ({
  type: FETCH_PHOTOS_INITIAL,
  payload,
});

export const getPhotos = () => (dispatch) => {
    console.log(`Photos/actions.js - getPhotos`);
    dispatch(requestPhotosStartAction);
    let avl = new AVLTreeClass();
    fetch(PHOTO_URL,{
      method: 'GET',
    }).then(function(res){
      return res.text();
    }).then(function(json){
      let result = JSON.parse(json);
      console.log(`getPhotos - received ${result.array.length} number of photos from the server`);
      for (let i = 0; i < result.array.length; i++) {
        console.log(`inserting ${result.array[i].url}`);
        avl.insert(result.array[i].url);
      }

      avl.displayAllNodes();

      dispatch(requestPhotosFinishAction(avl));
      dispatch(initialArrayAction(avl.firstToLast()));
    });
};

