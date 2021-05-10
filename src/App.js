import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMoviesBySearch } from './api/movies'
import { fetchNominatedMovies, nominateMovie } from './redux/app-redux';

const App = ({ getNominatedMovies, nominatedMovies }) => {

  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [results, setResults] = useState({});

  const search = async (event) => {
    if(event.key === 'Enter') {
      const data = await fetchMoviesBySearch(query)
      console.log("inside data:", data)
      setResults(data);
      console.log("inside search:", results)
      setLastQuery(query);
      setQuery('');
    }
  }

  useEffect(() => {
    getNominatedMovies()
  }, [getNominatedMovies]);

  return (
    <div>
      {nominatedMovies && (
        <div>
          <h2>Nominated Movies</h2>
        </div>
      )}
      <h1>Movie Title</h1>
      <input
        type="text"
        className="search"
        placeholder="Search by movie title..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyPress={search}
      />
      {results.Search && (
        <div>
          <h2>Movie Results for "{lastQuery}"</h2>
          <div>
          {results.Search.map((result) => {
            return (
              <div key={result.imdbID}>
                <p>{result.Title} ({result.Year})</p>
                <button onClick={() => nominateMovie(result)}>Nominate</button>
                <img src={result.Poster} alt={result.Title} />
              </div>
            )
          })}
          </div>
        </div>
      )}
      {results.Error && (
        <h2>{results.Error} Please try a new search.</h2>
      )}
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
