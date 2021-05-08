import axios from 'axios';

const URL = 'http://www.omdbapi.com'
const API_KEY = '446ae16d'

export const fetchMoviesBySearch = async (search) => {
  const { data } = await axios.get(URL, {
    params: {
      s: search,
      apikey:API_KEY
    }
  });
  return data;
}
