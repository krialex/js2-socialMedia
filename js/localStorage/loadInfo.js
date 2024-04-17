// load data from local storage
export function load(key) {
    return JSON.parse(localStorage.getItem(key));
}