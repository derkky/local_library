import { useState, useEffect } from "react"

const useBookList = () => {
    const [bookList, setBookList] = useState([])
    
    useEffect( () => {
        const fetchBookList = async () => {
            const bookListRes = await fetch("/api/book/all")
            const bookListResJson = await bookListRes.json()

            setBookList(bookListResJson)
        }

        fetchBookList()
    }, [])

    return bookList
}

export default useBookList