import { Link } from "react-router-dom"
import useGenreList from "./useGenreList"

const Genre = () => {
   
    const genreList = useGenreList()
    return(
        <div className="genre-container">
            <h1> Genre List</h1>
            <ul>
                {genreList.map(genre => {
                    return(
                         <li key={genre._id}> <Link to={genre.url}> {genre.name} </Link> </li> 
                    )
                })}
            </ul>
        </div>
    )
}

export default Genre