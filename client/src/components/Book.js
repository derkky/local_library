
import { Link } from "react-router-dom"
import useBookList from "./useBookList"

const Book = () => {
    
    const bookList = useBookList()
    
    return (
        <div className="book-container">
            <h1> Book List </h1>
            <ul>
                {bookList.map(book => {
                    return(
                        <li key={book._id}> <Link to={book.url}>{book.title}</Link> ({book.author.name})</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Book