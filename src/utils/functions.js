import {dictionary} from "../data/translations"

export const formatForDatabase = (pnr) => {
    const formated = pnr.replace(" ", "_");
    return formated;
}

export const formatForView = (pnr) => {
    const formated = pnr.replace("_", " ");
    return formated;
}

export const getText = (language, param) => {
    return dictionary[language][param];
}