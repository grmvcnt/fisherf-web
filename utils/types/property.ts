export type PropertyType = {
    uuid: string;
    title: string,
    city : {
        location: {
            lat: number,
            lon: number
        },
        name: string,
    }
    floor: number,
    room: number,
    bedroom: number,
    description: string,
    location: string,
    price: number,
}

export type PropertyAnalysisType = {
    city: {
        zipcode: string,
    },
    price: number,
    room: number,
    surface: number,
}

export type SimilarPropertyAnalysis = {
    pricePerMeter: number,
}