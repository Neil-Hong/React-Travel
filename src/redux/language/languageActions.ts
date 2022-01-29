export const CHANGE_LANGUAGE = "change_language";

export interface ChangLanguageAction{
    type:typeof CHANGE_LANGUAGE;
    payload:"zh"|"en"
}

export const changeLanguageCreator=(languageCode:"zh"|"en"):ChangLanguageAction=>{
    return {type: CHANGE_LANGUAGE, payload:languageCode}
}