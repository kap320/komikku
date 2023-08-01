import Navbar from "../Components/Navbar"

export const NotFound = () => {
    // document.body.style.backgroundColor = ""
    document.body.style.backgroundColor= "#eef0f2"
    return (
        <>
            <Navbar />
            <div className="w-fit h-fit mt-20 mb-10 mx-auto">
                <img src="https://kiryuu.id/wp-content/themes/mangareader/assets/images/404.png" alt="" className="bg-contain w-[400px] h-[300px]" />
            </div>
        </>
    )
}