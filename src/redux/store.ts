import {createStore, /*combineReducers,*/ applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { LanguageReducer } from "./language/LanguageReducer"
import { recommendProductsReducer } from "./recommendProducts/recommendProductsReducer"
import { actionLog } from "./middlewares/actionLog"
import { productDetailSlice } from "./productDetail/slice"
import { productSearchSlice } from "./productSearch/slice"
import { userSlice } from "./user/slice"
import { shoppingCartSlice } from "./shoppingCart/slice"
import { orderSlice } from "./order/slice"

 const persistConfig = {
     key:"root",
     storage,
     whiteList:["user"]
 }

 

 const rootReducer = combineReducers({
     language:LanguageReducer,
     recommendProducts:recommendProductsReducer,
     productDetail:productDetailSlice.reducer,
     productSearch:productSearchSlice.reducer,
     user:userSlice.reducer,
     shoppingCart:shoppingCartSlice.reducer,
     order:orderSlice.reducer
    })

const persistedReducer = persistReducer(persistConfig, rootReducer)

//  const store = createStore(rootReducer, applyMiddleware(thunk,actionLog))
const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog],
    devTools:true
})

const persistor = persistStore(store)

 export type RootState = ReturnType<typeof store.getState>
 
 export default {store, persistor}