import axios from 'axios';

const apiRoot = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
const normalizedRoot = apiRoot.replace(/\/$/, '');

export const http = axios.create({
    baseURL: `${normalizedRoot}/api`,
    withCredentials: false,
});

export default http;
