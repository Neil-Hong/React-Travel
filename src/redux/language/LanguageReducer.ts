import React from 'react';
import i18n from 'i18next';
import {CHANGE_LANGUAGE, ChangLanguageAction} from "./languageActions"

export interface LanguageState{
    language: "en" | "zh";
    languageList:{name:string, code:string}[]
}

const defaultState:LanguageState = {
    language:"en",
    languageList:[
        {name:"English", code:"en"},
        {name:"中文", code:"zh"}
    ]
}

export const LanguageReducer = (preState=defaultState, action:ChangLanguageAction) => {
    const {type, payload} = action
    if(type === CHANGE_LANGUAGE){
        i18n.changeLanguage(payload)
        const newState = {...preState, language:payload}
        return newState
    }
  return preState;
}
