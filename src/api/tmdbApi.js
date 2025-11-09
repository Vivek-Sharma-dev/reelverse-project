import axios from "axios";

// Get the API token from the .env file
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

// Create and export the reusable client
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});



export default api;
