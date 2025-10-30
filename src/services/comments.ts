import http from './http';
import type { CommentType } from '@/types';

export async function getComments(): Promise<CommentType[]> {
  const res = await http.get<CommentType[]>('/comments/');
  return res.data;
}

export async function createComment(formData: FormData): Promise<CommentType> {
  const res = await http.post<CommentType>('/comments/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}