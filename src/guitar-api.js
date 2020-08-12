/* eslint-disable */

import request from 'superagent';

const URL = 'https://my-project-summer2020.herokuapp.com';

export function fetchGuitars() {
    return request.get(`${URL}/guitars`);
    }

    export function fetchGuitar(id) {
    return request.get(`${URL}/guitars/${id}`);
    }
  