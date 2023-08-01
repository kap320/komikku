import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { searchComic } from "../Network/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";

export const Search = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const key = queryParams.get('search');
    const [ isSearch, setSearch ] = useState(null)

    useEffect(() => {
        document.body.style.backgroundColor= "#eef0f2"
        searchComic(key).then(res => setSearch(res))
    }, [])

    const SearchList = () =>{
        if(isSearch){
            return isSearch.data.map(comic => {
                let iconCountry
                if(comic.type === "Manga") iconCountry = "https://kiryuu.id/wp-content/themes/mangareader/assets/images/manga.png" 
                if(comic.type === "Manhwa") iconCountry = "https://kiryuu.id/wp-content/themes/mangareader/assets/images/manhwa.png" 
                if(comic.type === "Manhua") iconCountry = "https://kiryuu.id/wp-content/themes/mangareader/assets/images/manhua.png" 
                return (
                    <a href={`/detail/manga/${comic.endpoint.split('/')[2]}`}>
                        <div className="p-1 w-fit lg:inline-block hover:bg-[#eee]/30">
                            <div className="overflow-hidden lg:w-[203px] md:w-[300px] w-[200px] lg:h-[127px] md:h-[180px] h-[134px] relative">
                                {/* icon country */}
                                <img src={iconCountry} alt="" className='w-[25px] h-[17px] absolute bg-contain top-1 right-1'/>
                                {/* close icon country */}
                                <img src={comic.image} alt=""  className="object-cover lg:w-[203px] md:w-[300px] w-[200px] lg:h-[127px] md:h-[180px] h-[134px] bg-contain"/>
                                {/* icon hot */}
                                <FontAwesomeIcon icon={faHotjar} className='text-white text-[13px] rounded-full p-1 bg-primary absolute bottom-1 left-1'/>
                                {/* close icon hot */}
                            </div>
                            <div className="lg:w-[203px] md:w-[181px] w-[150px] h-fit my-3">
                                <h2 className="text-[14px] font-bold truncate">{comic.title}</h2>
                                <p className="mt-2 font-semibold text-[13px] text-gray">{comic.desc.split(".")[0]}</p>
                            </div>
                        </div>
                    </a>
                )
            })
        }
    }

    return (
        <>
        <Navbar />
        <div className="my-14 p-3 mx-auto w-4/5 rounded bg-white">
            <h1 className="text-[14px] font-bold ">Search '{key}'</h1>
            <hr className="my-3 text-[#f1f1f1]"/>
            <div className="lg:w-full w-fit mx-auto">
                <SearchList />
            </div>
        </div>
        </>
    )
}