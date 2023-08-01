import React, { useEffect, useState, useMemo } from 'react'
import { getComic } from "../Network/api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotjar } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

const Content = () => {
    const [comics, setComics] = useState(null)

    useEffect(() => {
        let subscribe = false
        getComic().then((res) => {
            if(!subscribe){
                setComics(res)
            }
        })

        return () => {
            subscribe = true
        }
    }, [])
    
    const PopularComicsList = () => {
        if(comics) {
            return comics.data.map((data, i) => {
                let iconCountry
                if(data.type === "Manga") iconCountry = "https://kiryuu.id/wp-content/themes/mangareader/assets/images/manga.png" 
                if(data.type === "Manhwa") iconCountry = "https://kiryuu.id/wp-content/themes/mangareader/assets/images/manhwa.png" 
                if(data.type === "Manhua") iconCountry = "https://kiryuu.id/wp-content/themes/mangareader/assets/images/manhua.png" 

                return(
                    <Link to={`/detail/manga/${data.endpoint.split('/')[2]}`} key={i}>
                        <div className="p-1 w-full">
                            <div className="overflow-hidden w-[203px] relative">
                                {/* icon country */}
                                <img src={iconCountry} alt="" className='w-[25px] h-[17px] absolute bg-contain top-1 right-1'/>
                                {/* close icon country */}
                                <img src={data.image} alt=""  className="object-cover w-[203px] h-[127px] bg-cover"/>
                                {/* icon hot */}
                                <FontAwesomeIcon icon={faHotjar} className='text-white text-[13px] rounded-full p-1 bg-primary absolute bottom-1 left-1'/>
                                {/* close icon hot */}
                            </div>
                            <div className="w-[203px] my-3">
                                <h2 className="text-[14px] font-bold truncate">{data.title}</h2>
                                <p className="mt-2 font-semibold text-[13px] text-gray">{data.desc.split('.')[0]}</p>
                            </div>
                            
                        </div>
                    </Link>
                )
            })
        }else {
            return Array.from({length: 10}, (_, i)=> {
                return (
                    <div key={i} className='p-1 w-full'>
                        <div className="w-[203px] h-[127px] bg-gray-300 animate-shimmer"></div>
                    </div>
                )
            })
        }
    }
    return (
        <>
        <div className="mt-14 mb-5">
            <div className="bg-primary w-full h-[45px] rounded-tl rounded-tr flex items-end">
                <div className="bg-white px-5 py-1 rounded-tl rounded-tr w-fit text-[14px] font-bold ml-4">
                    <p>Popular Today</p>
                </div>
            </div>
            <div className="rounded-br rounded-bl p-3 bg-white">
                {/* card */}
                <div className="overflow-auto flex gap-3">
                    <PopularComicsList />
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {/* <PopularComicsList /> */}
                </div>
                {/* end card */}
            </div>
        </div>
        <div></div>
        </>
    )
}

export default Content