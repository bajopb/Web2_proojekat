import axios  from "axios";


const api = axios.create({
    baseURL: "https://localhost:5000", // Adresa vašeg .NET Web API-ja    
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;