import request from 'superagent';

// TODO: change this URL depending on environment
const URL = process.env.REACT_APP_API_URL;

export function fetchGuitars() {
    return request.get(`${URL}/guitars`);
}

export function fetchGuitar(id) {
    return request.get(`${URL}/guitars/${id}`);
}
  
// lets assume they pass us some guitar data . . .
export function createGuitar(guitarData) {
    return request.post(`${URL}/guitars`, guitarData)
}