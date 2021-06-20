import {GET_DATA_FAILURE, GET_DATA_SUCCESS} from './constants'
const initialState = {
    data:[],
    loading: true,
    error:null
}


export default function dataReducer(state=initialState,action) {
    switch (action.type) {
       
        case GET_DATA_SUCCESS:
            return{
                ...state,
                data:action.payload,
                loading: false,
                }    
        case GET_DATA_FAILURE:
            return{
                ...state,
                error:action.payload,
                loading: false,
                }    
        default: return state;        
    }
}