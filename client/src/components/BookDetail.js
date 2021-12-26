import { Link, useParams, useNavigate } from "react-router-dom"
import useBookDetails from "./useBookDetails"

const BookDetail = () => {
    const bookDetail = useBookDetails()
    const navigate = useNavigate()
    const { id } = useParams()

    const handleDelete = () => {
        const deleteBook = async () => {
            const deleteBookReq = await fetch(`http://localhost:3001/book/${id}/delete`, {
                method: "POST"
            })

            if (deleteBookReq.ok) {
                navigate("/book/all")
            }
        }
       deleteBook()
    }

    return (
        bookDetail ? 
        <div className="book-detail-container">
            <h1>Title: {bookDetail.book.title} </h1>
            <p><b>Author:</b> <Link to={bookDetail.book.author.url}>{bookDetail.book.author.name}</Link></p>
            <p><b>Summary:</b> {bookDetail.book.summary}</p>
            <p><b>ISBN:</b> {bookDetail.book.isbn}</p>
            <p><b>Genre: </b>
                {bookDetail.book.genre.map(genre => {
                    return (
                        <Link key={genre._id} to={genre.url}>{genre.name}</Link>
                    )
                })}
            </p>

            <div className="book-bookinstance-container">
                {bookDetail.bookInstances.length > 0 ?
                    <>
                        <h2>Copies</h2>
                        {bookDetail.bookInstances.map(bookInstance => {
                            return(
                                <div key={bookInstance._id}>
                                    {bookInstance.status}
                                    <p><b>Imprint: </b>{bookInstance.imprint}</p>
                                    {bookInstance.due_back ? <p><b>Due back: </b>{bookInstance.due_back}</p> : null}
                                    <p><b>Id: </b><Link to={bookInstance.url}> {bookInstance.id} </Link></p>
                                </div>
                            )
                        })}
                    </>
                    : 
                    <>
                        <p>This book has no copies available.</p>
                        <button onClick={handleDelete}> Delete Book </button>
                    </> 
                }
                <Link to={`/book/${id}/update`} state={bookDetail}> Update Book </Link>
            </div>
        </div>
        : <div> Loading </div>
    )
}

export default BookDetail