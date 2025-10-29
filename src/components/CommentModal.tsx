import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CommentType } from '@/types';

interface Props {
    parentId?: number | null;
    onClose: () => void;
    onCommentAdded: (comment: CommentType) => void;
}

export default function CommentModal({ parentId = null, onClose, onCommentAdded }: Props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [homepage, setHomepage] = useState('');
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('homepage', homepage);
        formData.append('text', text);
        if (parentId) formData.append('parent', String(parentId));
        if (file) formData.append('file', file);

        const res = await axios.post<CommentType>('http://127.0.0.1:8000/api/comments/', formData);
        onCommentAdded(res.data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {parentId ? 'Reply to comment' : 'Add a comment'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        value={homepage}
                        onChange={e => setHomepage(e.target.value)}
                        placeholder="Homepage (optional)"
                        type="url"
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Your comment"
                        required
                        className="w-full border rounded px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input type="file" onChange={handleFileChange} className="w-full" />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
