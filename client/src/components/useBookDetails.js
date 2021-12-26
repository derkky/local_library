import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const useBookDetails = () => {
    const [bookDetail, setBookDetail] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getBookDetail = async () => {
            const bookDetailRes = await fetch(`http://localhost:3001/book/${id}`)
            const bookDetailJson = await bookDetailRes.json()
            setBookDetail(bookDetailJson)
        }
        getBookDetail()
    }, [])

    return bookDetail
}

export default useBookDetails