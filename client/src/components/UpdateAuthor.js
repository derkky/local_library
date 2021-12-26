import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const UpdateAuthor = () => {

    const location = useLocation()
    const authorDetail = location.state

    const [firstName, setFirstName] = useState(authorDetail.author.first_name)
    const [familyName, setFamilyName] = useState(authorDetail.author.family_name)
    const [dob, setDob] = useState(authorDetail.author.date_of_birth)
    const [dod, setDod] = useState(authorDetail.author.date_of_death)
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

            const updateAuthorRes = await fetch(`/api/author/${authorDetail.author._id}/update`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(author)

            })

            const updateAuthorJson = await updateAuthorRes.json()

            if (!updateAuthorRes.ok) {
                setErrors(updateAuthorJson.errors)
            } else {
                setErrors([])
                navigate("/author/all")
            }
        }

        submitData()
    }

    return(
        <div className="create-author-container">
            <h1> Update Author </h1>

            <form>
              <div>
                <label>First Name</label>
                <input type="text" name="firstName" defaultValue={authorDetail.author.first_name} onChange={handleFirstNameChange}/>
              </div>

              <div>
                <label>Family Name</label>
                <input type="text" name="familyName" defaultValue={authorDetail.author.family_name} onChange={handleFamilyNameChange}/>
              </div>
            
              <div>
                <label>Date of Birth</label>
                <input type="text" name="dob" defaultValue={authorDetail.author.date_of_birth} onChange={handleDobChange}/>
              </div>
            
              <div>
                <label>Date of Death</label>
                <input type="text" name="dod" defaultValue={authorDetail.author.date_of_death} onChange={handleDodChange}/>
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

export default UpdateAuthor