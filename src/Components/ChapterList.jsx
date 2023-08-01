import { useEffect, useState } from "react"
import { detailComic } from "../Network/api"
import { Link } from "react-router-dom"
import { getStorage } from "../Network/localStorage"

export const ChapterList = ({ endpoint }) => {
    const [listChapter, setListChapter] = useState(null)

    var getLocalStorage = JSON.parse(localStorage.getItem('comic')) || [] // storage

    useEffect(() => {
        detailComic(endpoint).then(res => {
            setListChapter(res.data)
        })
    }, [])

    const storage = listChapter ? getStorage(getLocalStorage, listChapter) : null

    const List = () => {
        if(listChapter){
            return (
                <>
                <div className="p-3 bg-white rounded my-5">
                    <h1 className="font-bold text-[15px] ">Chapter {listChapter.title}</h1>
                    <hr className="text-[#f1f1f1] my-3"/>
                    <div className="my-3 flex justify-between gap-4">
                        <Link to={`/${endpoint}${listChapter.chapter_list[listChapter.chapter_list.length - 1].endpoint}`} className="w-full p-4 bg-primary flex flex-col justify-center items-center rounded-lg text-white">
                            <p className="text-[15px] font-semibold text-center">First Chapter</p>
                            <h1 className="text-[20px] font-bold text-center leading-5 mt-2">{listChapter.chapter_list[listChapter.chapter_list.length - 1].name}</h1>
                        </Link>
                        <Link to={`/${endpoint}${listChapter.chapter_list[0].endpoint}`} className="w-full p-4 bg-primary flex flex-col justify-center items-center rounded-lg text-white">
                            <p className="text-[15px] font-semibold text-center">Last Chapter</p>
                            <h1 className="text-[20px] font-bold text-center leading-5 mt-2">{listChapter.chapter_list[0].name}</h1>
                        </Link>
                    </div>
                    <hr className="text-[#f1f1f1] my-3"/>
                    <div className="max-h-[297px] w-full flex flex-col gap-3 my-5 overflow-auto">
                        {/* list ch */}
                        {
                            listChapter.chapter_list.map(chap => 
                                <Link to={`/${endpoint}${chap.endpoint}`}>
                                    <div className={`py-3 px-2 rounded-md transition-all font-semibold hover:bg-primary hover:text-white ${ storage.chapter_list.includes(chap.endpoint) ? 'text-white bg-primary/30' : 'bg-[#efefef] text-[#333333]' }`}>
                                        <p className="text-[14px]">{chap.name}</p>
                                    </div>
                                </Link>
                            )
                        }
                        {/* close list ch */}
                    </div>
                </div>
                </>
            )
        }else{
            return (
                <>
                <div className="p-3 bg-white rounded my-5">
                    <h1 className="font-bold text-[15px] ">Chapter </h1>
                    <hr className="text-[#f1f1f1] my-3"/>
                    <div className="my-3 flex justify-between gap-4">
                        <div className="w-full p-4 h-[104px] bg-gray-300 animate-shimmer rounded-lg"></div>
                        <div className="w-full p-4 h-[104px] bg-gray-300 animate-shimmer rounded-lg"></div>
                    </div>
                </div>
                </>
            )
        }
    }
    return (
        <>
            <List />/
        </>
    )
}