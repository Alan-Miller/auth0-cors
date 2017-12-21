import axios from 'axios';

const initialState = {
    user: { name: 'Dummy' }
}

const SET_USER = 'SET_USER';

export function setUser() {
    const usr = axios({
        // url: '/auth/me',
        url: 'http://localhost:3005/auth/me',
        method: 'GET',
        withCredentials: true 
    }).then(usr => {
        console.log('usr', usr);
        return usr.data;
    });
    return {
        type: SET_USER,
        payload: usr
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        default:
            return state;
    }
}