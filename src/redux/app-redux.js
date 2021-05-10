import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { firebase } from "../firebase/config"
var db = firebase.firestore();

const SET_NOMINATED_MOVIES = "SET_NOMINATED_MOVIES"

export const setNominatedMovies = (nominatedMovies) => {
  return {
    type: SET_NOMINATED_MOVIES,
    nominatedMovies,
  };
};

export const fetchNominatedMovies = () => {
  return async(dispatch) => {
    const nominations = await (await db.collection('nominations').get()).docs.map(doc => doc.data());
    console.log("NOMINATIONS:", nominations)
    dispatch(setNominatedMovies(nominations))
  }
}

export const nominateMovie = async (movieData) => {
    await db.collection('nominations').doc(movieData.imdbID).set(movieData);
};

const initialState = [];

const nominationsReducer = (state = initialState, action) => {
  console.log("STATE:", state)
  switch (action.type) {
    case SET_NOMINATED_MOVIES:
      return action.nominatedMovies
    default:
      return state;
  }
};

const store = createStore(nominationsReducer, applyMiddleware(thunkMiddleware));

export { store };
