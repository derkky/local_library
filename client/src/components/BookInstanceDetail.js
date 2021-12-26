import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const BookInstanceDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [bookInstanceDetail, setBookInstanceDetail] = useState(null)

    useEffect(()=> {
        const fetchBookInstanceDetail = async () => {
            const bookInstanceDetailRes = await fetch(`http://localhost:3001/bookinstance/${id}`)
            const bookInstanceDetailJson = await bookInstanceDetailRes.json()
            setBookInstanceDetail(bookInstanceDetailJson)
        }

        fetchBookInstanceDetail()
    }, [])

    const handleDelete = () => {
        const deleteBookInstance = async () => {
            const deleteBookinstanceRes = await fetch(`http://localhost:3001/bookinstance/${id}/delete`, {
                method: "POST"
            })
            if (deleteBookinstanceRes.ok){
                navigate("/bookinstance/all")
            }
        }

        deleteBookInstance()
    }

    return(
        bookInstanceDetail ? 
        <div className="book-instance-detail-container">
            <h1>ID: {bookInstanceDetail._id} </h1>
            <span><b>Title: </b> <Link to={bookInstanceDetail.book.url}>{bookInstanceDetail.book.title}</Link></span>
            <span><b>Imprint: </b> {bookInstanceDetail.imprint} </span>
            <span><b>Status: </b> {bookInstanceDetail.status} </span>
            {bookInstanceDetail.due_back ? 
                <span><b>Due back: </b> {bookInstanceDetail.due_back} </span>
            : null}

            <button onClick={handleDelete}>Delete book instance</button>
            <Link to={`/bookinstance/${id}/update`} state={bookInstanceDetail}>Update book instance </Link>
        </div>
        : <div> Loading </div>
    )
}

export default BookInstanceDetail