import {ThunkAction} from "redux-thunk";
import axios from "axios";
import { RootState } from "../store";


export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS";

interface FetchRecommendProductStartAction{
    type:typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction{
    type:typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload:any
}

interface FetchRecommendProductFailAction{
    type:typeof FETCH_RECOMMEND_PRODUCTS_FAIL
    payload:any
}


export type RecommendProductsActions = 
    FetchRecommendProductStartAction |
    FetchRecommendProductFailAction |
    FetchRecommendProductSuccessAction

export const fetchRecommendProductStartActionCreator = ():FetchRecommendProductStartAction=>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductFailActionCreator = (error):FetchRecommendProductFailAction=>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload:error
    }
}

export const fetchRecommendProductSuccessActionCreator = (data):FetchRecommendProductSuccessAction=>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload:data
    }
}

export const giveMeDataActionCreator = ():ThunkAction<
    void, RootState, undefined, RecommendProductsActions
    > => async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartActionCreator());
        try{
            const {data} = await axios.get(
                "http://123.56.149.216:8089/api/productCollections"
            );
            dispatch(fetchRecommendProductSuccessActionCreator(data))
        }catch(error:any){
            dispatch(fetchRecommendProductFailActionCreator(error.message));
        }

}