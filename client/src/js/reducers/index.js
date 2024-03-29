import { SET_DATA } from "../constants/action-types"

const initialState = {
    data: []
}

function rootReducer(state = initialState, action) {
    if(action.type === SET_DATA) {
        return Object.assign({}, state, {
            data: action.payload
          })
    }

    return state;
}

export default rootReducer