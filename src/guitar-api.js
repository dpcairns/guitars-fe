import request from 'superagent';
// TODO: change this URL depending on environment
const URL = process.env.REACT_APP_API_URL;
// prevents having to login every time we make a change in react

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);
    } catch(e) {
        return e;
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        return e;
    }
}

export function fetchGuitars() {
    const token = localStorage.getItem('token');

    return request
        .get(`${URL}/api/guitars`)
        .set('Authorization', token);
}

export function fetchBrands() {
    const token = localStorage.getItem('token');

    return request.get(`${URL}/api/brands`)
        .set('Authorization', token);
}

export function fetchGuitar(id) {
    const token = localStorage.getItem('token');

    return request.get(`${URL}/api/guitars/${id}`)
        .set('Authorization', token);
}

export function deleteGuitar(id) {
    const token = localStorage.getItem('token');

    return request.delete(`${URL}/api/guitars/${id}`)
        .set('Authorization', token);
}

export function updateGuitar(id, updatedGuitar) {
    const token = localStorage.getItem('token');

    return request.put(`${URL}/api/guitars/${id}`, updatedGuitar)
        .set('Authorization', token);   
}
  
// lets assume they pass us some guitar data . . .
export function createGuitar(guitarData) {
    const token = localStorage.getItem('token');

    return request.post(`${URL}/api/guitars`, guitarData)
        .set('Authorization', token);
}