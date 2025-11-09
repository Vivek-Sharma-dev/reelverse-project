import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'     // for routing
import { WatchListProvider } from './Context/WatchListContext.jsx'

// ReelVerse pages
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import SearchResult from './Pages/SearchResult.jsx'
import MovieDetails from './Pages/MovieDetails.jsx'
import Bollywood from './Pages/Bollywood.jsx'
import Hollywood from './Pages/Hollywood.jsx'
import Contact from './Pages/Contact.jsx'
import Anime from './Pages/Anime.jsx'
import TopRatedMovies from './Pages/TopRatedMovies.jsx'
import Trending from './Pages/Trending.jsx'
import UpcomingMovies from './Pages/UpcomingMovies';
import WatchList from './Pages/WatchList.jsx';
import ActorDetails from './Pages/ActorDetails.jsx'
import TvShowDetails from './Pages/TvShowDetails.jsx'



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
    path: '/watchList',
    element: <WatchList />,
  },
]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchListProvider>
    <RouterProvider router={router} />
    </WatchListProvider>
  </StrictMode>,
)
