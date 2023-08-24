// Common States
const commonState = {
    propertyID: null,
    isLoggedIn: false,
    userID: null,
    userName: '',
}

//Property States
const propertyStates = {
    starRating: null
}

const accommodationState ={
            accommodationtype:null
           
}
const filter = {
    rate:0,
    rating:0,
    location:0,
    amenities:null
}
const historyIds = {
    property_ids: null
}
const initialState = {
    ...commonState,
    ...propertyStates,
    ...accommodationState,
    ...filter,
    ...historyIds
}


export { initialState }
//app id onesignal
// e4c79ca5-84c0-4619-b633-7722b34e79d9
