import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateGenre = () => {

    const [genre, setGenre] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleChange = (ev) => {
        setGenre(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const newGenre = {name: genre}

        const submitData = async() => {
            const res = await fetch("/api/genre/create", {
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
            <h1> Create Genre </h1>

            <form>
                <label>Genre</label>
                <input type="text" placeholder="Fantasy, Poetry etc" onChange={handleChange}/>
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

export default CreateGenre