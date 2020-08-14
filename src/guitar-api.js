import request from 'superagent';

// TODO: change this URL depending on environment
const URL = process.env.REACT_APP_API_URL;

export function fetchGuitars() {
    try{
        return request.get(`${URL}/guitars`);
    } catch(e) {
        return { error: e.message }
    }
}


export function fetchBrands() {
    try{
        return request.get(`${URL}/brands`);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchGuitar(id) {
    return request.get(`${URL}/guitars/${id}`);
}

export function deleteGuitar(id) {
    return request.delete(`${URL}/guitars/${id}`);
}

export function updateGuitar(id, updatedGuitar) {
    return request.put(`${URL}/guitars/${id}`, updatedGuitar);
}
  
// lets assume they pass us some guitar data . . .
export function createGuitar(guitarData) {
    return request.post(`${URL}/guitars`, guitarData)
}