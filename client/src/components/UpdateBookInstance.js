import useBookList from "./useBookList"
import {useState} from "react"
import { useNavigate, useLocation } from "react-router-dom"

const UpdateBookInstance = () => {
    const location = useLocation()
    const bookInstanceDetail = location.state

    const navigate = useNavigate()
    const [book, setBook] = useState(bookInstanceDetail.book._id)
    const [imprint, setImprint] = useState(bookInstanceDetail.imprint)
    const [date, setDate] = useState(bookInstanceDetail.due_back)
    const [status, setStatus] = useState(bookInstanceDetail.status)
    const [errors, setErrors] = useState([])


    const handleBookChange = (ev) => {
        setBook(ev.target.value)
    }

    const handleImprintChange = (ev) => {
        setImprint(ev.target.value)
    }

    const handleDateChange = (ev) => {
        setDate(ev.target.value)
    }

    const handleStatusChange = (ev) => {
        setStatus(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const submitData = async () => {
            const bookInstance = {
                book: book,
                imprint: imprint,
                status: status,
                due_back: date
            }

            const updateBookInstanceRes = await fetch(`/api/bookinstance/${bookInstanceDetail._id}/update`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bookInstance)

            })

            const updateBookInstanceResJson = await updateBookInstanceRes.json()

            if (!updateBookInstanceRes.ok) {
                setErrors(updateBookInstanceResJson.errors)
            } else {
                setErrors([])
                navigate("/bookinstance/all")
            }
        }

        submitData()
    }

    const bookList = useBookList()
    return(
        <div className="create-book-instance-container">
            <h1> Update Book Instance</h1>
            <form>
                <div>
                    <label> Book: </label>
                    <select onClick={handleBookChange} defaultValue={bookInstanceDetail.book._id}>
                        {bookList.map(book => {
                            return(
                                <option key={book._id} value={book._id}> {book.title} </option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label> Imprint: </label>
                    <input type="text" onChange={handleImprintChange} defaultValue={bookInstanceDetail.imprint}/>
                </div>

                <div>
                    <label> Date when book available: </label>
                    <input type="text" onChange={handleDateChange} defaultValue={bookInstanceDetail.due_back}/>
                </div>

                <div>
                    <label> Status: </label>
                    <select onClick={handleStatusChange} defaultValue={bookInstanceDetail.status}>
                        <option value="Loaned"> Loaned </option>
                        <option value="Maintenance"> Maintenance </option>
                        <option value="Available"> Available </option>
                    </select>
                </div>

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>

            <ul>
                {errors.map(error => {
                    return(
                        <li key={error.msg}>{error.msg}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default UpdateBookInstance