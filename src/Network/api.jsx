import axios from "axios"

const BASE_URL = "https://manga-api-kappa.vercel.app"

export const getComic = async () => {
    const response = await axios.get(BASE_URL + "/api/popular/page/1")
    return response.data
}

export const getTopComic = async () => {
    const response = await axios.get(BASE_URL + "/api/recommended/page/1")
    return response.data
}

export const detailComic = async (endpoint) => {
    const response = await axios.get(BASE_URL + "/api/genres/" + endpoint)
    return response.data
}

export const detailChapter = async (endpoint) => {
    const response = await axios.get(BASE_URL + '/api/chapter/' + endpoint)
    return response.data
}

export const searchComic = async (key) => {
    const response = await axios.get(BASE_URL + "/api/search/" + key)
    return response.data
}
