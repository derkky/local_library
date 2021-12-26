import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const UpdateGenre = () => {

    const location = useLocation()
    const genreDetails = location.state

    const [genre, setGenre] = useState(genreDetails.genre.name)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleChange = (ev) => {
        setGenre(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const newGenre = {name: genre}

        const submitData = async() => {
            const res = await fetch(`http://localhost:3001/genre/${genreDetails.genre._id}/update`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newGenre)
            })

            const resJson = await res.json()

            if (!res.ok){
                setErrors(resJson.errors)
            } else {
                setErrors([])
                navigate("/genre/all")
            }
        }

        submitData()
    }
    return(
        <div className="create-genre-container">
            <h1> Update Genre </h1>

            <form>
                <label>Genre</label>
                <input type="text" defaultValue={genreDetails.genre.name} onChange={handleChange}/>
                <button type="submit" onClick={handleSubmit}> Submit </button>
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

export default UpdateGenre