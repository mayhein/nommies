import axios from 'axios';

const URL = 'http://www.omdbapi.com'

export const fetchMoviesBySearch = async (search) => {
  const { data } = await axios.get(URL, {
    params: {
      s: search,
      apikey: process.env.REACT_APP_OMDB_API_KEY
    }
  });
  return data;
}
