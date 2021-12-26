import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const AuthorDetail = () => {
    const { id } = useParams()
    
    const navigate = useNavigate()

    const [authorDetail, setAuthorDetail] = useState(null)

    useEffect(() => {
        const getAuthorDetail = async () => {
            const authorDetailRes = await fetch(`/api/author/${id}`)
            const authorDetailJson = await authorDetailRes.json()
            setAuthorDetail(authorDetailJson)
        } 

        getAuthorDetail()
    },[])
    
    const handleDelete = () => {
        const deleteAuthor = async () => {
            const deleteAuthorRes = await fetch(`/api/author/${id}/delete`, {
                method: "POST"
            })

            if (deleteAuthorRes.ok) {
                navigate("/author/all")
            }
        }
        deleteAuthor()
    }
    return (
        authorDetail ?
        <div className="author-detail-container">
            <h1>Author: {authorDetail.author.name}</h1>
            <span> {authorDetail.author.lifespan} </span>

            {authorDetail.books.length > 0 ?
            <>
                <h4>Books</h4>
                {authorDetail.books.map(book => {
                    return (
                        <div key={book._id} className="author-detail-book">
                            <Link to={book.url}>{book.title}</Link>
                            <p>{book.summary}</p>
                        </div>
                    )
                })}
            </>
            :   <div>
                    This author has no books
                    <button onClick={handleDelete}>Delete author</button>
                </div>}
            <Link to={`/author/${id}/update`} state={authorDetail}>Update author</Link>
        </div>
        : <div> Loading </div>
    )
}

export default AuthorDetail