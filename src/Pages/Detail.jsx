import { useParams } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { DetailComic } from "../Components/DetailComic"
import { ChapterList } from "../Components/ChapterList"
import { useEffect, useState } from "react"
import { searchComic } from "../Network/api"

const Detail = () => {
    const { type, title } = useParams()
    const endpoint = type.toLowerCase()+"/"+title
    
    const [getComic, setComic] = useState(null)
    useEffect(() => {
        document.body.style.backgroundColor= "#eef0f2"
        searchComic(title).then(res => {
            setComic(res.data.filter(filter => filter.endpoint === "/"+endpoint+"/")[0])
        }).catch((err) => console.log(err.response.status))
    }, [])

    document.title= getComic ? `Komik ${getComic.title} - Komikku` : "Komikku"
    
    return(
        <>
        <Navbar />
        {getComic ?
            <img src={getComic.image} alt="" loading="lazy" className="absolute -z-10 h-[280px] w-full bg-contain object-cover"/>
        :
            null
        }
        <div className="mx-auto lg:w-[60%] md:w-[80%] w-[90%] lg:mt-[12%] mt-[20%]">
            <DetailComic endpoint={endpoint} />
            <ChapterList endpoint={endpoint} />
        </div>
        </>
    )
}

export default Detail