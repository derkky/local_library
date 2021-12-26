import React from "react"
import useAuthorList from "./useAuthorList"
import useGenreList from "./useGenreList"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const UpdateBook = () => {
    const navigate = useNavigate()

    const authorList = useAuthorList()
    const genreList = useGenreList()

    const location = useLocation()
    const bookDetail = location.state

    const [title, setTitle] = useState(bookDetail.book.title)
    const [author, setAuthor] = useState(bookDetail.book.author._id)
    const [summary, setSummary] = useState(bookDetail.book.summary)
    const [isbn, setIsbn] = useState(bookDetail.book.isbn)
    const [genre, setGenre] = useState(bookDetail.book.genre.map(genre => genre._id))

    const [errors, setErrors] = useState([])

    const handleTitleChange = (ev) => {
        setTitle(ev.target.value)
    }

    const handleAuthorChange = (ev) => {
        setAuthor(ev.target.value)
    }
    
    const handleSummaryChange = (ev) => {
        setSummary(ev.target.value)
    }
    
    const handleIsbnChange = (ev) => {
        setIsbn(ev.target.value)
    }

    const handleGenreClick = (ev) => {
        if (genre.includes(ev.target.value)){
            setGenre(genre.filter(gen => gen !== ev.target.value))
        } else {
            setGenre(prevState => [...prevState, ev.target.value])
        }
    }
    
    const handleSubmit = (ev) => {
        ev.preventDefault()

        const newBook = {
            title: title,
            author: author,
            summary: summary,
            isbn: isbn,
            genre: genre
        }

        const submitData = async () => {
            const updateBookRes = await fetch(`http://localhost:3001/book/${bookDetail.book._id}/update`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newBook)
            })

            const updateBookJson = await updateBookRes.json()

            if (!updateBookRes.ok){
                setErrors(updateBookJson.errors)
            } else {
                setErrors([])
                navigate("/book/all")
            }
        }

        console.log(newBook)

        submitData()
    }


    return(
        bookDetail && authorList && genreList ?
        <div className="create-book-container">
            <h1> Update Book </h1>
            <form>
                <div>
                    <label>Title</label>
                    <input type="text" defaultValue={bookDetail.book.title} onChange={handleTitleChange}/>
                </div>

                <div>
                    <label>Author</label>
                    <select onClick={handleAuthorChange} defaultValue={bookDetail.book.author.name}>
                        {authorList.map(author => {
                            return(
                                <option key={author._id} value={author._id}> {author.name} </option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label>Summary</label>
                    <input type="text" defaultValue={bookDetail.book.summary} onChange={handleSummaryChange}/>
                </div>

                <div>
                    <label>ISBN</label>
                    <input type="text" defaultValue={bookDetail.book.isbn} onChange={handleIsbnChange}/>
                </div>

                <div>
                    <label>Genre</label>
                    <div>
                        {genreList.map(_genre => {
                            return(
                                <React.Fragment key={_genre._id}>
                                    <label> {_genre.name} </label>
                                    <input type="checkbox" value={_genre._id} defaultChecked={genre.includes(_genre._id)} onClick={handleGenreClick}/>
                                </React.Fragment>
                            )
                        })}
                    </div>
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
        : <div>Loading</div>
    )
}

export default UpdateBook