export const getStorage = (getLocalStorage, comic) => {
    if(comic && comic !== ""){
        let data = {
            name: comic.title,
            chapter_list: [],
            latest_chapter: {
                nama: null,
                route: null,
            }
        }

        if(getLocalStorage.length > 0){
            let index = getLocalStorage.findIndex(res => res.name === comic.title)
            let getStorage = getLocalStorage[index]

            if(getStorage) return getStorage 
            
            getLocalStorage.push(data)
            
        }else{
            getLocalStorage.push(data)
        }
        
        let stringify = JSON.stringify(getLocalStorage) 
        localStorage.setItem("comic", stringify)
        
        return data

    }
}

export const setChapterStorage = (getLocalStorage, comic, newStorage) => {
    if (comic && comic !== "") {
        let index = getLocalStorage.findIndex(res => res.name === comic.title)
        let getStorage = getLocalStorage[index]

        if(getStorage){
            getLocalStorage[index] = newStorage

            let stringify = JSON.stringify(getLocalStorage) 
            localStorage.setItem("comic", stringify)
        }

    }
}