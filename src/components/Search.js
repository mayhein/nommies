import React, { useState } from 'react'
import { connect } from 'react-redux';
import '../App.css'
import { nominateMovieThunk, removeNominationThunk } from '../redux/app-redux';
import { fetchMoviesBySearch } from '../api/movies'
import { Button } from './Button'

function Search({ nominatedMovies, removeNomination, nominateMovie }) {

  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [results, setResults] = useState({});

  const search = async (event) => {
    if(event.key === 'Enter') {
      const data = await fetchMoviesBySearch(query)
      setResults(data);
      setLastQuery(query);
      setQuery('');
    }
  }

  return (
    <>
      <div className="search__container">
        <h2 className="search__title">Search Movies To Nominate For The Shoppies 2021</h2>
        <input
          type="text"
          className="search__input"
          placeholder="Search by movie title..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {results.Search && (
        <div>
          <p>Movie Results for "{lastQuery}"</p>
          <div>
          {results.Search.map((result) => {
            return (
              <div key={result.imdbID}>
                <p>{result.Title} ({result.Year})</p>
                {nominatedMovies.filter((movie) => movie.imdbID === result.imdbID ).length ? (
                  <button onClick={() => removeNomination(result.imdbID)}>Remove Nomination</button>
                ) : (
                  <button onClick={() => nominateMovie(result)}>Nominate</button>
                )}
              </div>
            )
          })}
          </div>
        </div>
      )}
      {results.Error && (
        <h2>{results.Error} Please try a new search.</h2>
      )}
    </>
  )
}

const mapState = (state) => {
  return {
    nominatedMovies: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    nominateMovie: (movie) => dispatch(nominateMovieThunk(movie)),
    removeNomination: (imdbId) => dispatch(removeNominationThunk(imdbId))
  };
};

export default connect(mapState, mapDispatch)(Search);

