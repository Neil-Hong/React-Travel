import React from 'react';
import {FETCH_RECOMMEND_PRODUCTS_FAIL, FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_PRODUCTS_SUCCESS, RecommendProductsActions} from "./recommendProductsAction"

interface RecommendProductsState{
    productList:any[],
    loading:boolean,
    error:string|null
}

const defaultState: RecommendProductsState ={
    loading:true,
    error:null,
    productList:[]
}

export const recommendProductsReducer = (preState = defaultState, action: RecommendProductsActions) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return {...preState, loading:true}
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return {...preState, loading:false, productList:action.payload}
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return {...preState, loading:false, error:action.payload}
        default:
            return preState;
    }

}
