import useBookList from "./useBookList"
import {useState} from "react"
import { useNavigate } from "react-router-dom"

const CreateBookInstance = () => {

    const navigate = useNavigate()
    const [book, setBook] = useState("")
    const [imprint, setImprint] = useState("")
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")
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

            const createBookInstanceRes = await fetch("/api/bookinstance/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bookInstance)

            })

            const createBookInstanceResJson = await createBookInstanceRes.json()

            if (!createBookInstanceRes.ok) {
                setErrors(createBookInstanceResJson.errors)
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
            <h1> Create Book Instance</h1>
            <form>
                <div>
                    <label> Book: </label>
                    <select onClick={handleBookChange}>
                        {bookList.map(book => {
                            return(
                                <option key={book._id} value={book._id}> {book.title} </option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label> Imprint: </label>
                    <input type="text" onChange={handleImprintChange}/>
                </div>

                <div>
                    <label> Date when book available: </label>
                    <input type="text" onChange={handleDateChange}/>
                </div>

                <div>
                    <label> Status: </label>
                    <select onClick={handleStatusChange}>
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

export default CreateBookInstance