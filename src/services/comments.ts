import http from './http';
import type {CommentType} from '@/types';

export interface CommentsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: CommentType[];
}

export async function getComments(page = 1): Promise<CommentsResponse> {
    const res = await http.get<CommentsResponse>(`/comments/?page=${page}`);
    return res.data;
}

export async function createComment(formData: FormData): Promise<CommentType> {
    const res = await http.post<CommentType>('/comments/', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
    });
    return {
        ...res.data,
        replies: [],
    };
}