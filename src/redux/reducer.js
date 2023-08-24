// Import Initial State
import {initialState} from './initialState';

// Reducers (Modifies The State And Returns A New State)
const reducer = (state = initialState, action) => {
    // console.log('reduxAction:', action);
    switch (action.type) {
        case 'UPDATE_STATE': {
            return {
                // State
                ...state,
                // Redux Store
                [action.payload.target]: action.payload.value,
            }
        }

        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default reducer;
