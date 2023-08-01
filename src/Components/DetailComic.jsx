import { useEffect, useState } from "react"
import { detailComic } from "../Network/api"
import { getStorage } from "../Network/localStorage"
import { Link } from "react-router-dom"

export const DetailComic = ({ endpoint }) => {
    const [comic, setComic] = useState(null)
    useEffect(() => {
        let subscribe = false
        detailComic(endpoint).then(res => {
            if(!subscribe){
                setComic(prev => prev ? prev : res.data)
                console.log("storage", storage)
                console.log("global", getLocalStorage)
            }
        }).catch(err => err.response.status)

        return () => {
            subscribe = true
        }
    }, [])
    
    var getLocalStorage = JSON.parse(localStorage.getItem('comic')) || []

    const storage = comic ? getStorage(getLocalStorage, comic) || [] : null

    const Detail = () => {
        if(comic){
            if(comic.title !== "")return (
                <div className="p-3 bg-white rounded">
                    <h1 className="text-[18px] font-bold">{comic.title}</h1>
                    <div className="flex lg:items-left mg:items-left items-center lg:flex-row md:flex-row flex-col gap-4 my-3">
                        <img src={comic.thumbnail} loading="lazy" alt="" className=" w-[184px] object-cover bg-contain"/>
    
                        <div className="w-full">
                            <table className="table w-full text-[14px]">
                                <tbody>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Type</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal">{comic.type}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Author</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal">{comic.author}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Status</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal">{comic.status}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Rating</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal">{comic.rating}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {storage.latest_chapter.nama && storage.latest_chapter.route ? 
                            <Link to={`/${endpoint}${storage.latest_chapter.route}`}>
                                <div className="bg-primary mt-4 text-white font-bold p-2 rounded-lg w-fit text-[13px]">
                                    <p>Latest Chapter : {storage.latest_chapter.nama}</p>
                                </div>
                            </Link>
                            :
                            null
                            }

                            {/* genres */}
                            <div className="w-full text-[14px] text-primary font-bold mt-5">
                                {
                                    comic.genre.map(item => {
                                        return (
                                            <p className="px-3 m-1 py-1 inline-block border border-primary rounded">
                                                {item}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            {/* close genres */}
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="p-3 bg-white rounded">
                    <div className="flex lg:items-left mg:items-left items-center lg:flex-row md:flex-row flex-col gap-4 my-3">
                        <div className="w-[230px] h-[244px] bg-gray-300 animate-shimmer"></div>

                        <div className="w-full">
                            <table className="table w-full text-[14px]">
                                <tbody>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Type</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal"></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Author</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal"></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Status</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal"></td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 bg-[#f0f2f5] border border-[#ddd] w-[98px] text-[#555555] font-bold">Rating</td>
                                        <td className="p-2 border border-[#ddd] whitespace-normal"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
        <Detail />
        </>
    )
}