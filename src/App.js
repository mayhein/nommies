import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import NominatedMovies from './components/NominatedMovies';
import Search from './components/Search';
import { fetchNominatedMovies } from './redux/app-redux';

const App = ({ getNominatedMovies, nominatedMovies }) => {

  useEffect(() => {
    getNominatedMovies()
  }, [getNominatedMovies]);

  return (
    <div>
      <Navbar />
      {nominatedMovies && (
        < NominatedMovies />
      )}
      <Search />
    </div>
  )
}

const mapState = (state) => {
  return {
    nominatedMovies: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getNominatedMovies: () => dispatch(fetchNominatedMovies()),
  };
};

export default connect(mapState, mapDispatch)(App);
