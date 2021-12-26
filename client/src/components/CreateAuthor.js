import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateAuthor = () => {

    const [firstName, setFirstName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [dob, setDob] = useState("")
    const [dod, setDod] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const handleFirstNameChange = (ev) => {
        setFirstName(ev.target.value)
    }
    
    const handleFamilyNameChange = (ev) => {
        setFamilyName(ev.target.value)
    }
    
    const handleDobChange = (ev) => {
        setDob(ev.target.value)
    }

    const handleDodChange = (ev) => {
        setDod(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const submitData = async () => {
            const author = {
                first_name: firstName,
                family_name: familyName,
                date_of_birth: dob,
                date_of_death: dod
            }

            const createAuthorRes = await fetch("http://localhost:3001/author/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(author)

            })

            const createAuthorResJson = await createAuthorRes.json()

            if (!createAuthorRes.ok) {
                setErrors(createAuthorResJson.errors)
            } else {
                setErrors([])
                navigate("/author/all")
            }
        }

        submitData()
    }

    return(
        <div className="create-author-container">
            <h1> Create Author </h1>

            <form>
              <div>
                <label>First Name</label>
                <input type="text" name="firstName" placeholder="First name" onChange={handleFirstNameChange}/>
              </div>

              <div>
                <label>Family Name</label>
                <input type="text" name="familyName" placeholder="Surname" onChange={handleFamilyNameChange}/>
              </div>
            
              <div>
                <label>Date of Birth</label>
                <input type="text" name="dob" placeholder="mm/dd/yy" onChange={handleDobChange}/>
              </div>
            
              <div>
                <label>Date of Death</label>
                <input type="text" name="dod" placeholder="mm/dd/yy" onChange={handleDodChange}/>
              </div>

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

export default CreateAuthor