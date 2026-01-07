import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'     // for routing
import { WatchListProvider } from './Context/WatchListContext.jsx'

// ReelVerse pages
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import SearchResult from './Pages/SearchResult.jsx'
import MovieDetails from './Pages/Details/MovieDetails.jsx'
import Bollywood from './Pages/Movie/Bollywood.jsx'
import Hollywood from './Pages/Movie/Hollywood.jsx'
import Contact from './Pages/Contact.jsx'
import Anime from './Pages/Movie/Anime.jsx'
import TopRatedMovies from './Pages/Movie/TopRatedMovies.jsx'
import Trending from './Pages/Movie/Trending.jsx'
import UpcomingMovies from './Pages/Movie/UpcomingMovies.jsx';
import WatchList from './Pages/WatchList.jsx';
import ActorDetails from './Pages/Details/ActorDetails.jsx'
import TvShowDetails from './Pages/Details/TvShowDetails.jsx'
import NowPlaying from './Pages/Movie/NowPlaying.jsx'



// here we are defining our routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [ 
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <SearchResult />,
  },
  {
    path: '/movie/:id',
    element: <MovieDetails />,
  },
  {
    path: '/person/:id',
    element: <ActorDetails />,
  },
  {
    path: '/tv/:id',
    element: <TvShowDetails />,
  },
  {
    path: '/bollywood',
    element: <Bollywood />,
  },
  {
    path: '/hollywood',
    element: <Hollywood />,
  },
  {
    path: '/anime',
    element: <Anime />,
  },
  { 
    path: '/contact',
    element: <Contact />,
  },
  { 
    path: '/top-rated-movies',
    element: <TopRatedMovies />,
  },
  { 
    path: '/trending',
    element: <Trending />,
  },
  { 
    path: '/upcoming',
    element: <UpcomingMovies />,
  },
  { 
    path: '/now-playing',
    element: <NowPlaying />,
  },
  { 
    path: '/watchList',
    element: <WatchList />,
  },
]
  },
])

createRoot(document.getElementById('root')).render(
    <WatchListProvider>
    <RouterProvider router={router} />
    </WatchListProvider>
)
