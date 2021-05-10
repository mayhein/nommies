import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { removeNominationThunk } from '../redux/app-redux';
import { Button } from './Button';

function NominatedMovies({ nominatedMovies, removeNomination }) {
  return (
    <>
      <section class="nominations">
        <h2 class="sectionTitle">Nominated Movies</h2>
          <a href="#section3">‹</a>
          {nominatedMovies.map((movie) => {
            return (
              <div class="item" key={movie.imdbID}>
                <p>{movie.Title} ({movie.Year})</p>
                <button onClick={() => removeNomination(movie.imdbID)}>Remove Nomination</button>
              </div>
            )
          })}
          <a href="#section3">›</a>
      </section>
    </>
  );
}

const mapState = (state) => {
  return {
    nominatedMovies: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    removeNomination: (imdbId) => dispatch(removeNominationThunk(imdbId))
  };
};

export default connect(mapState, mapDispatch)(NominatedMovies);
