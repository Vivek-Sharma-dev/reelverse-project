import { Link } from 'react-router-dom'
import { useWatchList } from '../Context/WatchListContext'
import MovieCard from '../Components/MovieCard'

const WatchList = () => {
    const { watchList } = useWatchList()
  return (
    <div className='container mx-auto p-4 md:p-8'>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        My WatchList 
      </h1>

      {watchList.length=== 0 ? (
        <div className="text-center text-gray-400 text-lg h-[60vh] flex flex-col justify-center">
            <p className="text-lg">Your WatchList is empty</p>
            <p>Add movies to your list to see them here.</p>
            <Link to='/' className='text-blue-500 hover:text-blue-400 font-semibold mt-4 inline-block'>
            Find Movies
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
            {watchList.map(movie => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
        </div>
      )}
    </div>
  )
}

export default WatchList
