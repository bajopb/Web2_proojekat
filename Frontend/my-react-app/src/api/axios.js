import axios  from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_LINK,
    headers: {
        'Content-Type': 'application/json',
    },
});