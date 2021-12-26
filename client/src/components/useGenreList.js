import { useState, useEffect } from "react"

const useGenreList = () => {
    const [genreList, setGenreList] = useState([])
    useEffect(() => {
        const getGenreList = async () => {
            const genreListRes = await fetch("/api/genre/all")
            const genreListJson = await genreListRes.json()
            setGenreList(genreListJson)
        }

        getGenreList()
    }, [])

    return genreList
}

export default useGenreList