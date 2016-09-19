import globalData from './globalData';

const storageKey = globalData.storageKey;
const dataStringified = JSON.stringify(globalData.data);

export default {
    fetch() {
        return JSON.parse(window.localStorage.getItem(storageKey) || dataStringified);
    },
    save() {
        window.localStorage.setItem(storageKey, JSON.stringify(globalData.data));
    },
};
