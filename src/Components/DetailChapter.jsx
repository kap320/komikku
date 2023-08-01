import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { detailChapter, detailComic } from "../Network/api";
import { getStorage, setChapterStorage } from "../Network/localStorage";

export const DetailChapter = ({ endpoint, endpointComic }) => {
    const [ getDetailChapter, setDetailChapter ] = useState(null)
    const [ listChapter, setListChapter ] = useState(null)

    var getLocalStorage = JSON.parse(localStorage.getItem('comic')) || [] // storage

    useEffect(() => {
        detailChapter(endpoint).then(res => setDetailChapter(res.data))
        detailComic(endpointComic).then(res => setListChapter(res.data))
    }, [])

    const ListImage = () => {
        if(getDetailChapter){
            return (
                <div className="flex flex-col items-center">
                    {
                        getDetailChapter.image.map((img, i) => 
                            <img src={img} loading="lazy" alt="" key={i}/>
                        )
                    }
                </div>
            )
        }else{
            return(
                <div className="w-fit h-fit mx-auto my-5">
                    <img src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="" />
                </div>
            )
        }
    }

    const selectChapter = (val) => {
        document.location.href = `/${endpointComic+val}`
    }

    if(listChapter){
        if(listChapter.title !== ""){
            var chapterNow = listChapter.chapter_list.findIndex(res => typeof res.endpoint !== "undefined" ? res.endpoint === "/ch/"+endpoint+"/" : [])
    
            var prevChapter = typeof listChapter.chapter_list[chapterNow + 1] !== "undefined" ? listChapter.chapter_list[chapterNow + 1].endpoint : 'undefined'
        
            var nextChapter = typeof listChapter.chapter_list[chapterNow - 1] !== "undefined" ? listChapter.chapter_list[chapterNow - 1].endpoint : 'undefined'

            const storage = async () => {
                let data = await getStorage(getLocalStorage, listChapter)

                if(!data.chapter_list.includes("/ch/"+endpoint+"/")){
                    data.chapter_list.push("/ch/"+endpoint+"/")
                    data.latest_chapter = {
                        nama: listChapter.chapter_list.filter(res => res.endpoint === `/ch/${endpoint}/`)[0].name,
                        route: "/ch/"+endpoint+"/"
                    }
                } 

                await setChapterStorage(getLocalStorage, listChapter, data)

                console.log("check chapter",getLocalStorage)
            }

            storage()
        }
    }

    if(getDetailChapter){
        return (
            <div className="lg:w-[90%] w-full mx-auto mt-16">
                <div className="px-5 py-1">
                    <div className="">
                        <h1 className="text-[21px] text-white font-bold text-center">{getDetailChapter.title}</h1>
                        <p className="text-[13px] text-white font-semibold text-center">All chapters in <Link to={`/detail/${endpointComic}`}className="text-primary font-bold">{getDetailChapter.title.split("Chapter")[0]}</Link></p>
                        <p className="text-[14px] text-[#999999] text-center font-semibold mt-4">Read the latest manga <span className="font-bold text-white">{getDetailChapter.title}</span> . Comic <span className="font-bold text-white">{getDetailChapter.title.split("Chapter")[0]}</span> is always updated. Dont forget to read the other manga updates.</p>
                    </div>
    
                    <div className="flex lg:flex-row flex-col gap-4 items center justify-between my-5">
                        <div>
                            <select name="" onChange={(e) => selectChapter(e.target.value)} className="rounded-full w-full px-2 text-[13px] text-[#9b9b9b] border border-[#333] pr-14 py-[3px] bg-[#333333] font-semibold" id="">
                                {listChapter ?
                                    listChapter.chapter_list.map((list, i) =>
                                        <option key={i} value={list.endpoint} selected={list.endpoint === "/ch/"+endpoint+"/"}>{list.name}</option>
                                    )
                                :
                                <option value="">0</option>
                                }
                            </select>
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            {prevChapter !== 'undefined' && listChapter ?
                            <a href={`/${endpointComic}${prevChapter}`} className="text-white font-bold bg-primary rounded-full px-5 flex gap-1 items-center py-1 text-[13px]"><FontAwesomeIcon icon={faChevronLeft} className="font-bold"/>Prev</a>
                            :
                            <button className=" font-bold bg-[#333] rounded-full px-5 flex gap-1 items-center py-1 text-[13px] text-[#999999]"><FontAwesomeIcon icon={faChevronLeft} className="font-bold"/>Prev</button>
                            }
                            {nextChapter !== 'undefined' && listChapter ?
                            <a href={`/${endpointComic}${nextChapter}`} className="text-white font-bold bg-primary rounded-full px-5 flex items-center py-1 text-[13px] gap-1">Next <FontAwesomeIcon icon={faChevronRight} className="font-bold"/></a>
                            :
                            <button className=" font-bold bg-[#333] rounded-full px-5 flex items-center py-1 text-[13px] gap-1 text-[#999999]">Next <FontAwesomeIcon icon={faChevronRight} className="font-bold"/></button>
                            }
                        </div>
                    </div>
                </div>
                {/* images */}
                <ListImage />
                {/* close images */}
                <div className="flex items-center gap-2 justify-end my-4 mx-4">
                    {prevChapter !== 'undefined' && listChapter ?
                    <a href={`/${endpointComic}${prevChapter}`} className="text-white font-bold bg-primary rounded-full px-5 flex gap-1 items-center py-1 text-[13px]"><FontAwesomeIcon icon={faChevronLeft} className="font-bold"/>Prev</a>
                    :
                    <button className=" font-bold bg-[#333] rounded-full px-5 flex gap-1 items-center py-1 text-[13px] text-[#999999]"><FontAwesomeIcon icon={faChevronLeft} className="font-bold"/>Prev</button>
                    }
                    {nextChapter !== 'undefined' && listChapter ?
                    <a href={`/${endpointComic}${nextChapter}`} className="text-white font-bold bg-primary rounded-full px-5 flex items-center py-1 text-[13px] gap-1">Next <FontAwesomeIcon icon={faChevronRight} className="font-bold"/></a>
                    :
                    <button className=" font-bold bg-[#333] rounded-full px-5 flex items-center py-1 text-[13px] gap-1 text-[#999999]">Next <FontAwesomeIcon icon={faChevronRight} className="font-bold"/></button>
                    }
                </div>
            </div>
        )
    }else{
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <img src="https://kiryuu.id/wp-content/themes/mangareader/assets/img/readerarea.svg" alt="" />
            </div>
        )
    }
}