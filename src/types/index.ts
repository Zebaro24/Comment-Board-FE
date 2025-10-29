export interface FileType {
    id: number;
    file_type: 'image' | 'text';
    file: string;
    uploaded_at: string;
}

export interface CommentType {
    id: number;
    username: string;
    email: string;
    homepage?: string;
    text: string;
    parent?: number | null;
    created_at: string;
    updated_at: string;
    replies?: CommentType[];
    files?: FileType[];
}
