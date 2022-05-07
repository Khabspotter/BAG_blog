export const useLocalStorage = () => {
    const readLS = (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            return localStorage.getItem(key);
        }
    };

    const writeLS = (key, value) => {
        const storage = readLS(key) || [];
        storage.push(value);
        localStorage.setItem(key, JSON.stringify(storage));
    };

    const removeLS = (key, value) => {
        const storage = readLS(key);
        const filteredStorage = storage.filter((itemID) => value !== itemID);
        localStorage.setItem(key, JSON.stringify(filteredStorage));
    };

    return { readLS, writeLS, removeLS };
};