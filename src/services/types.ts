export interface LocationType {
    id: string,
    name: string,
    address: string,
    website: string,
    location: {
        lat: number,
        lng: number
    },
    types: string[]
}

export interface PriceType {
    id: number | null,
    from: number | null,
    to: number | null
} 

export interface TourType {
    id: number,
    name: string,
    location: string,
    description: string,
    starts: string,
    ends: string,
    fromPrice: number,
    toPrice: number
}