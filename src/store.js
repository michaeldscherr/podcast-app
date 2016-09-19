import globalData from './data';

const storageKey = 'scherrcast_data';

export default {
    fetch() {
        return JSON.parse(window.localStorage.getItem(storageKey) || JSON.stringify(globalData));
    },
    save(data) {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
    },
};
