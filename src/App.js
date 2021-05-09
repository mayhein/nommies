import React, { useState } from 'react';

import { fetchMoviesBySearch } from './api/movies'

const App = () => {

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

  return (
    <div>
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
                <button>Nominate</button>
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

export default App;
