import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { firebase } from "../firebase/config"
var db = firebase.firestore();

const SET_NOMINATED_MOVIES = "SET_NOMINATED_MOVIES"
const NOMINATE_MOVIE = "NOMINATE_MOVIE"
const REMOVE_NOMINATION = "REMOVE_NOMINATION"

export const setNominatedMovies = (nominatedMovies) => {
  return {
    type: SET_NOMINATED_MOVIES,
    nominatedMovies,
  };
};

export const nominateMovie = (movie) => {
  return {
    type: NOMINATE_MOVIE,
    movie,
  };
};

export const removeNomination = (imdbId) => {
  return {
    type: REMOVE_NOMINATION,
    imdbId,
  };
};

export const fetchNominatedMovies = () => {
  return async(dispatch) => {
    const nominations = await (await db.collection('nominations').get()).docs.map(doc => doc.data());
    dispatch(setNominatedMovies(nominations))
  }
}

export const nominateMovieThunk = (movieData) => {
  return async(dispatch) => {
    if (addLocalStorage()) {
      await db.collection('nominations').doc(movieData.imdbID).set(movieData);
      dispatch(nominateMovie(movieData))
    }
  }
};

export const addLocalStorage = () => {
  let data = JSON.parse(window.localStorage.getItem('nominations'))
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

export const removeNominationThunk = (imdbId) => {
  return async(dispatch) => {
    await db.collection('nominations').doc(imdbId).delete();
    dispatch(removeNomination(imdbId))
  }
};

const initialState = [];

const nominationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOMINATED_MOVIES:
      return action.nominatedMovies;
    case NOMINATE_MOVIE:
      return [...state, action.movie];
    case REMOVE_NOMINATION:
      return [...state].filter(
        movie => movie.imdbID !== action.imdbId
      )
    default:
      return state;
  }
};

const store = createStore(nominationsReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export { store };
