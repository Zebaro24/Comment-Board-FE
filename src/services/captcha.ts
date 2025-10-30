import http from './http';

export interface CaptchaResponse {
    key: string;
    image: string;
}

export async function getCaptcha(): Promise<CaptchaResponse> {
    const res = await http.get<CaptchaResponse>('/captcha/');
    return res.data;
}
