import { useState, useEffect } from "react"
import { useParams , Link, useNavigate } from "react-router-dom"

const GenreDetail = () => {
    const [genreDetails, setGenreDetails] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getGenreDetail = async () => {
            const genreDetailsRes = await fetch(`/api/genre/${id}`)
            const genreDetailsJson = await genreDetailsRes.json()
            setGenreDetails(genreDetailsJson)
        }

        getGenreDetail()
    }, [])

    const handleDelete = () => {
        const deleteGenre = async () => {
            const deleteRes = await fetch(`/api/genre/${id}/delete`, {
                method: "POST"
            })
            if (deleteRes.ok){
                navigate("/genre/all")
            }
        }

        deleteGenre()
    }
    
    return (
        genreDetails ?
        <div className="genre-detail-container">
            <h1>Genre: {genreDetails.genre.name}</h1>
            {
                genreDetails.books.length > 0 ?
                <>
                    <h4>Books</h4>
                    <div className="genre-book-container">
                        {genreDetails.books.map(book => {
                            return (
                                <div key={book._id}>
                                    <Link to={book.url}>{book.title}</Link>
                                    <p>{book.summary}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
                : 
                <>
                    <p>This genre has no books</p>
                    <button onClick={handleDelete}> Delete Genre </button>
                </>
            }
            <Link to={`/genre/${id}/update`} state={genreDetails}>Update genre</Link>
        </div>
        : <div> Loading </div>
    )
}

export default GenreDetail