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
  if (addLocalStorage()) {
    await db.collection('nominations').doc(movieData.imdbID).set(movieData);
  }
};

export const addLocalStorage = () => {
  let data = JSON.parse(window.localStorage.getItem('nominations'))
  console.log("DATA:", data)
  if (data) {
    if (data < 5) {
      data++;
      window.localStorage.setItem('nominations', JSON.stringify(data))
      return true;
    } else {
      alert("You've already nominated five movies.")
      return false;
    }
  } else {
    data = 1
    window.localStorage.setItem('nominations', JSON.stringify(data))
    return true;
  }
}

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
