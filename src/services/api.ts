import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.clarifai.com',
    headers: {
        "Authorization": "Key 2db4cd5088ec49c084ed00db0829bc38"
    }
})