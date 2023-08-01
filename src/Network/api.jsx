import axios from "axios"

const BASE_URL = "https://komikku-api.zeronedoo.repl.co"

export const getComic = async () => {
    const response = await axios.get(BASE_URL + "/api/comic/popular/page/1")
    return response.data
}

export const getTopComic = async () => {
    const response = await axios.get(BASE_URL + "/api/comic/recommended/page/1")
    return response.data
}

export const detailComic = async (endpoint) => {
    const response = await axios.get(BASE_URL + "/api/comic/info/" + endpoint)
    return response.data
}

export const detailChapter = async (endpoint) => {
    const response = await axios.get(BASE_URL + '/api/comic/chapter/ch/' + endpoint)
    return response.data
}

export const searchComic = async (key) => {
    const response = await axios.get(BASE_URL + "/api/comic/search/" + key)
    return response.data
}