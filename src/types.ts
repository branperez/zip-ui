export interface Location {
    postCode: string,
    country: string,
    countryAbv: string,
    places: [Place]
}

export interface Place {
    name: string,
    longitude: string,
    state: string,
    stateAbv: string,
    latitude: string
}

export interface Country {
    name: string,
    code: string 
}

export interface History {
    postCode: string,
    city: string,
    state: string,
    timeStamp: number 
}
