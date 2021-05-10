import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMoviesBySearch } from './api/movies'
import Navbar from './components/Navbar';
import NominatedMovies from './components/NominatedMovies';
import { fetchNominatedMovies, nominateMovieThunk, removeNominationThunk } from './redux/app-redux';

const App = ({ getNominatedMovies, nominatedMovies, nominateMovie, removeNomination }) => {

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

  useEffect(() => {
    getNominatedMovies()
  }, [getNominatedMovies]);

  return (
    <div>
      {/* <button><a href='https://github.com/mayhein/shoppies' target='_blank' rel="noreferrer">View Source Code on GitHub @ mayhein/shoppies</a></button>
      <h1>The Shoppies</h1> */}
      <Navbar />
      {nominatedMovies && (
        < NominatedMovies />
        // <div>
        //   <h1>Nominated Movies</h1>
        //   {nominatedMovies.map((movie) => {
        //     return (
        //       <div key={movie.imdbID}>
        //         <p>{movie.Title} ({movie.Year})</p>
        //         <button onClick={() => removeNomination(movie.imdbID)}>Remove Nomination</button>
        //       </div>
        //     )
        //   })}
        // </div>
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
                {nominatedMovies.filter((movie) => movie.imdbID === result.imdbID ).length ? (
                  <button onClick={() => removeNomination(result.imdbID)}>Remove Nomination</button>
                ) : (
                  <button onClick={() => nominateMovie(result)}>Nominate</button>
                )}
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
    nominateMovie: (movie) => dispatch(nominateMovieThunk(movie)),
    removeNomination: (imdbId) => dispatch(removeNominationThunk(imdbId))
  };
};

export default connect(mapState, mapDispatch)(App);
