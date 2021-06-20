
import {GET_DATA_FAILURE, GET_DATA_SUCCESS} from './constants'


export const fetchDataSuccess = (payload) => ({
    type : GET_DATA_SUCCESS,
    payload 
})

export const fetchDataFailure = (payload) => ({
    type : GET_DATA_FAILURE,
    payload
})
