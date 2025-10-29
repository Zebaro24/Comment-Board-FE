"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from '../components/CommentList';
import { CommentType } from '@/types';
import CommentModal from "@/components/CommentModal";
import {buildCommentTree} from "@/utils/buildCommentTree";

export default function Home() {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get<CommentType[]>('http://127.0.0.1:8000/api/comments/').then(res => {
            const tree = buildCommentTree(res.data);
            setComments(tree);
        });
    }, []);

    const handleCommentAdded = (newComment: CommentType) => {
        setComments(prev => buildCommentTree([newComment, ...flattenComments(prev)]));
    };

    function flattenComments(tree: CommentType[]): CommentType[] {
        const flat: CommentType[] = [];
        function recurse(list: CommentType[]) {
            for (const c of list) {
                flat.push({ ...c, replies: [] });
                if (c.replies && c.replies.length) recurse(c.replies);
            }
        }
        recurse(tree);
        return flat;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Comments</h1>

                <CommentList comments={comments} onReplyAdded={handleCommentAdded} />

                {openModal && (
                    <CommentModal
                        onClose={() => setOpenModal(false)}
                        onCommentAdded={handleCommentAdded}
                    />
                )}

                <button
                    onClick={() => setOpenModal(true)}
                    className="block mx-auto mb-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
                >
                    Leave a Comment
                </button>
            </div>
        </div>
    );
}
