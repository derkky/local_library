import { Link } from "react-router-dom"
import useAuthorList from "./useAuthorList"

const Author = () => {

  const authorList = useAuthorList()

  return(
    authorList ?
    <div className="author-container">
      <h1> Author List</h1>
      <ul>
        {authorList.map(author => {
            return(
              <li key={author._id}>
                <Link to={author.url}> {author.name} </Link> {author.lifespan}
              </li>
            )
          })}
      </ul>
    </div>
    : <div>Loading</div>
  )
}

export default Author