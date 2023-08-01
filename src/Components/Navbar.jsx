import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { searchComic } from '../Network/api'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchPhone, setIsSearchPhone] = useState(false)
    const [ search, setSearch ] = useState(null)
    const [ keyword, setKeyword ] = useState(null)

    useEffect(() => {
        console.count("ini search")
        if(keyword){
            searchComic(keyword).then(res => setSearch(res)).catch(err => err)
        }
    }, [keyword])

    const menuHandler = () => setIsOpen((prev) => !prev)
    const searchPhone = () => setIsSearchPhone((prev) => !prev)

    const SearchResult = () => {
        return search.data.map(item => 
            <a href={`/detail/manga/${item.endpoint.split('/')[2]}`}>
                <div className='flex items-center hover:bg-[#eee]/30 w-full gap-3 p-3 border-b border-b-[#eee]'>
                    <img src={item.image} alt="" className='bg-contain object-cover w-[80px] h-[60px]'/>
                    <div className='font-bold overflow-hidden'>
                        <h3 className='text-[13px] text-[#333] line-clamp-2'>{item.title}</h3>
                        <p className='text-[12px] text-[#888888]'>{item.desc.split(".")[0]}</p>
                        <p className='text-[12px] text-[#888888] truncate'>{item.type}</p>
                    </div>
                </div>
            </a>
        )
    }

    return (
        <>
        <div className="bg-primary text-white w-full px-3 py-4 flex items-center justify-between">
            <div className='lg:hidden md:block sm:block'>
                <button className='flex items-center' onClick={() => menuHandler()}>
                    {isOpen ?
                        <FontAwesomeIcon icon={faTimes} className='text-[22px]'/>
                    :
                        <FontAwesomeIcon icon={faBars} className='text-[22px]'/>
                    }
                </button>
            </div>
            <div id="logo" className="">

            </div>
            <div className="items-center gap-6 font-semibold text-[15px] hidden lg:flex md:hidden sm:hidden">
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/manga">Manga List</Link>
                </div>
                <div>
                    <Link to="/manhua">Manhua Lists</Link>
                </div>
                <div>
                    <Link to="/manhwa">Mahwa Lists</Link>
                </div>
            </div>
            <div className="flex gap-3 items-center mr-[3%]">
                {/* togle */}
                <div>
                    <p className="text-[10px] font-semibold">DARK?</p>
                </div>
                {/* end togle */}
                {/* search phone */}
                <div className="lg:hidden md:hidden sm:flex items-center w-fit h-fit">
                    <button className="bg-[#333]/10 rounded-full p-2 flex items-center" onClick={() => searchPhone()}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
                {isSearchPhone || (search !== 404 && search !== null) ?
                    <form action="/" method="get" className='absolute left-2 right-2 lg:hidden md:hidden sm:block '>
                        <input type="text" name='search' placeholder='Search...' onKeyUp={(e) => setKeyword(e.target.value)} className="outline-primary text-black px-3 py-2 text-[15px] rounded-full w-full" autoComplete="off" />
                        <button type='button'  className="w-fit h-fit" onClick={() => searchPhone()}>
                            <FontAwesomeIcon icon={faTimes} className='absolute right-2 py-1 px-[6px] text-[16px] bg-gray rounded-full top-[17%]' />
                        </button>
                    </form>
                :
                    null
                }
                {/* end search phone */}
                {/* search desktop */}
                <div className="relative hidden lg:block md:block">
                    <form action="/" method='get'>
                        <input type="text" name="search" placeholder='Search...' onKeyUp={(e) => setKeyword(e.target.value)} className="outline-primary text-black px-3 py-1 text-[14px] rounded-full w-full" autoComplete="off" />
                        <div className='absolute right-2 top-[15%] w-5 h-5 flex items-center justify-center'>
                            <button className="">
                                <FontAwesomeIcon icon={faSearch} className='text-primary font-bold text-[15px]'/>
                            </button>
                        </div>
                    </form>
                </div>
                {/* end search desktop */}
            </div>
        </div>
        {search ?
            <div className='search bg-white max-h-[450px] overflow-auto absolute lg:w-1/4 lg:left-auto lg:right-2 left-1 right-1 z-10 flex flex-col rounded'>
                <SearchResult />
            </div>
        :
        null
        }
        {isOpen ?
            <div className='lg:hidden md:block sm:block absolute w-full min-h-[300vh] z-10 p-5 bg-card-dark'>
                <div className="gap-4 flex flex-col text-[15px] text-white font-semibold">
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/manga">Manga List</Link>
                    </div>
                    <div>
                        <Link to="/manhua">Manhua Lists</Link>
                    </div>
                    <div>
                        <Link to="/manhwa">Mahwa Lists</Link>
                    </div>
                </div>
            </div>
        :
            null
        }
        </>
    )
}

export default Navbar