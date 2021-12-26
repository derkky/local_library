import { useState, useEffect } from "react"

const Home = () => {

    const [homeData, setHomeData] = useState({})

    useEffect(() => {
        const fetchHomeData = async () => {

            // Should just have virtual that returns length...
            const fetchCount = async (route) => {
                const list = await fetch(`http://localhost:3001/${route}/all`)
                const listJson = await list.json()
                const listCount = listJson.length

                return listCount
            }

            setHomeData(
                {
                    authors: await fetchCount("author"),
                    books: await fetchCount("book"),
                    copies: await fetchCount("bookinstance"),
                    genres: await fetchCount("genre"),
                }
            )
        }

        fetchHomeData()
    }, [])

    return(
        <div className="home-container">
            <div>
              <h1> Local Library Home </h1>
              <p> Welcome! </p>
            </div>

            <div>
              <h1> Dynamic content </h1>
              <ul>
                  <li> Authors: {homeData.authors}</li>
                  <li> Books: {homeData.books} </li>
                  <li> Copies: {homeData.copies}</li>
                  <li> Genres: {homeData.genres} </li>
              </ul>
            </div>

        </div>
    )
}

export default Home