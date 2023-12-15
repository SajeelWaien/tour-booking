import axios, { AxiosResponse } from "axios"
import type { LocationType, TourType } from "./types"

export const locationList = async (search: string): Promise<AxiosResponse<{ results: LocationType[] }>> => {
    const resp = await axios('https://trueway-places.p.rapidapi.com/FindPlaceByText', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
        },
        params: {
            language: 'en',
            text: search
        }
    })

    return resp
}

export const getToursList = async (): Promise<AxiosResponse<TourType[]>> => {
    const resp = await axios('https://gist.githubusercontent.com/SajeelWaien/fbb0a280c6c472c1acb1b239f02cfcc2/raw/1d15e62d1e1536d02af0e92b9be76c24fdd51714/tours.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })

    return resp
}