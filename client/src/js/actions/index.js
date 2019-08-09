import { SET_DATA } from "../constants/action-types"

export function setData(payload) {
    return { type: SET_DATA, payload }
}