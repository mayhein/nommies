import axios from 'axios';
import { omdbApiKey } from "../secrets.js";

const URL = 'http://www.omdbapi.com'

export const fetchMoviesBySearch = async (search) => {
  const { data } = await axios.get(URL, {
    params: {
      s: search,
      apikey: omdbApiKey
    }
  });
  return data;
}
