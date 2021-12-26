import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const BookInstance = () => {
    const [bookInstanceList, setBookInstanceList] = useState([])
    
    useEffect( () => {
        const fetchBookInstanceList = async () => {
            const bookInstanceListRes = await fetch("/api/bookinstance/all")
            const bookInstanceListResJson = await bookInstanceListRes.json()

            setBookInstanceList(bookInstanceListResJson)
        }

        fetchBookInstanceList()
    }, [])
    return (
        <div className="book-instance-container">
            <h1> Book Instance List </h1>
            <ul>
                {bookInstanceList.map(bookInstance => {
                    return(
                        <li key={bookInstance._id}> 
                            <Link to={bookInstance.url}> 
                                {bookInstance.book.title}
                            </Link> - {bookInstance.status}
                            {bookInstance.due_back ? 
                                <span> (Due: {bookInstance.due_back})</span>
                            : null}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BookInstance