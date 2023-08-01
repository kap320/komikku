import Content from "../Components/Content"
import HeroImage from "../Components/HeroImage"
import Navbar from "../Components/Navbar"
import { Search } from "./Search"

const Home = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const yourParam = queryParams.get('search');

    document.body.style.backgroundColor= "#eef0f2"
    document.title= "Komikku"

    if(yourParam) return <Search />

    return (
        <>
            <Navbar></Navbar>
            <div className="sm:w-5/6 mx-auto">
                <HeroImage></HeroImage>
                <Content></Content>
            </div>
        </>
    )
}

export default Home