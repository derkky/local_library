import { Link } from "react-router-dom"

const Sidebar = () => {
    return(
        <div className="sidebar-container">
            <ul>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/author/all">All authors</Link> </li>
                <li> <Link to="/book/all">All books</Link> </li>
                <li> <Link to="/bookinstance/all">All book instances</Link> </li>
                <li> <Link to="/genre/all">All genres</Link> </li>
            </ul>
            <ul>
                <li> <Link to="/author/create">Create new author</Link> </li>
                <li> <Link to="/book/create">Create new book</Link> </li>
                <li> <Link to="/bookinstance/create">Create new book instance</Link> </li>
                <li> <Link to="/genre/create">Create new genre</Link> </li>
            </ul>
        </div>
    )
}

export default Sidebar