import { useEffect, useState } from "react"
import Slider from "react-slick"
import { getTopComic } from "../Network/api"
import { Link } from "react-router-dom"

const HeroImage = () => {
    const [getTopComics, setTopComics] = useState(null)

    useEffect(()=>{
        let subscribe = false
        getTopComic().then((res) => {
            if(!subscribe){
                setTopComics(res.data.slice(0, 4))
            }
        })

        // clean up function
        return () => {
            subscribe = true
        }

    }, [])

    const settings = {
        dots: true,
        Infinity: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    }

    const TopComicsList = () => {
        if(getTopComics){
            return <Slider {...settings}>
                {
                    getTopComics.map((comic, i) => {
                        return (
                            <div className="w-full sm:mt-8 mb-3 h-fit overflow-hidden relative" key={i}>
                                {/* bg */}
                                <div className="bg-black/20 absolute w-full h-[270px] sm:h-[350px]">
                                </div>
                                {/* close bg */}
                                <img src={comic.image} alt="" className="h-[270px] sm:h-[350px] w-full bg-contain object-cover"/>
                                {/* detail */}
                                <Link to={`/detail/${comic.type.toLowerCase()}/${comic.endpoint.split('/')[2]}`}>
                                    <div className="absolute bottom-[17%] left-[5%] right-[5%] w-fit">
                                        <h1 className="text-white font-bold lg:text-[28px] md:text-[26px] text-[24px] max-h-[70px] line-clamp-2">{comic.title}</h1>
                                        <p className="text-white text-[14px] lg:w-[620px] md:w-[510px] w-[300px] truncate">{comic.desc.split('lalu.')[1]}</p>
                                        <div className="flex gap-3 items-center">
                                            <div className="my-2 w-fit">
                                                <p className="text-white font-semibold text-[14px]">Type</p>
                                                <p className="px-3 py-1 rounded-lg font-semibold text-white bg-primary w-fit mt-1 text-[13px]">{comic.type}</p>
                                            </div>
                                            <div className="my-2 w-fit">
                                                <p className="text-white font-semibold text-[14px]">Last update</p>
                                                <p className="px-3 py-1 rounded-lg font-semibold text-white bg-blue-700 w-fit mt-1 text-[13px]">{comic.desc.split('.')[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                {/* close detail */}
                            </div>
                        )
                    })
                }
            </Slider>
        }else{
            return <Slider {...settings}>
                {
                    Array.from({length: 4}, (_, i)=> {
                        return (
                            <div key={i} className="h-[270px] sm:h-[350px] w-full bg-gray-300 animate-shimmer"></div>
                        )
                    })
                }
            </Slider>
        }
    }

    return(
        <>
            <TopComicsList />
        </>
    )
}

export default HeroImage