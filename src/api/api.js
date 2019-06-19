export default class Api {
    async request(url, method, fn) {
        const response = await fetch(url, {method});
        const data = await response.json();
        await fn(data);
    }
};
