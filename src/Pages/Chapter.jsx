import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { DetailChapter } from "../Components/DetailChapter";

export const Chapter = () => {
    const { type, title, endpoint } = useParams()
    const endpointComic = type+"/"+title
    useEffect(() => {
        document.body.style.backgroundColor = "#222"
    }, [])

    return (
        <>
        <Navbar />
        <DetailChapter endpoint={endpoint} endpointComic={endpointComic} />
        </>
    )
}