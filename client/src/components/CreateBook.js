import React, { useEffect } from "react"
import useAuthorList from "./useAuthorList"
import useGenreList from "./useGenreList"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateBook = () => {
    const navigate = useNavigate()

    const authorList = useAuthorList()
    const genreList = useGenreList()

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [summary, setSummary] = useState("")
    const [isbn, setIsbn] = useState("")
    const [genre, setGenre] = useState([])

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
            const createBookRes = await fetch("/api/book/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newBook)
            })

            const createBookJson = await createBookRes.json()

            if (!createBookRes.ok){
                setErrors(createBookJson.errors)
            } else {
                setErrors([])
                navigate("/book/all")
            }
        }

        console.log(newBook)

        submitData()
    }


    return(
        authorList && genreList ? 
        <div className="create-book-container">
            <h1> Create Book </h1>
            <form>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder="Name of book" onChange={handleTitleChange}/>
                </div>

                <div>
                    <label>Author</label>
                    <select onClick={handleAuthorChange}>
                        {authorList.map(author => {
                            return(
                                <option key={author._id} value={author._id}> {author.name} </option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <label>Summary</label>
                    <input type="text" placeholder="Summary" onChange={handleSummaryChange}/>
                </div>

                <div>
                    <label>ISBN</label>
                    <input type="text" placeholder="ISBN13" onChange={handleIsbnChange}/>
                </div>

                <div>
                    <label>Genre</label>
                    <div>
                        {genreList.map(genre => {
                            return(
                                <React.Fragment key={genre._id}>
                                    <label> {genre.name} </label>
                                    <input type="checkbox" value={genre._id} onClick={handleGenreClick}/>
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
        : <div> Loading </div>
    )
}

export default CreateBook