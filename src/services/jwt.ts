import http from './http';

export async function getAnonymousToken(): Promise<string> {
    let token = localStorage.getItem('jwt');
    if (!token) {
        const res = await http.post<{ token: string }>('/token-anon/');
        token = res.data.token;
        localStorage.setItem('jwt', token);
    }
    return token;
}