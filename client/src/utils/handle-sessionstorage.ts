export const GET_SESSIONSTORAGE_VALUE = (key: string) => {
    return sessionStorage.getItem(key);
}


export const SET_SESSIONSTORAGE_VALUE = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
    return;
}

export const DELETE_SESSIONSTORAGE_VALUE = (key: string) => {
    sessionStorage.removeItem(key);
    return;
}