import { useState, useEffect } from "react"

const useAuthorList = () => {
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
      const fetchAuthorList = async () => {
        const authorListReq = await fetch("/api/author/all")
        const authorListJson = await authorListReq.json()
        setAuthorList(authorListJson)
      }
    
      fetchAuthorList()
    }, [])

    return authorList
}

export default useAuthorList