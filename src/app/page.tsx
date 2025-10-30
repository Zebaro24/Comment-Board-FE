"use client"
import {useState, useEffect} from 'react';
import {CommentList, CommentModal} from '@/components';
import {CommentType} from '@/types';
import {Button} from '@/components/ui';
import {getComments} from '@/services/comments';
import {insertCommentIntoTree} from "@/utils/insertCommentIntoTree";

export default function Home() {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchComments = (page = 1) => {
        getComments(page)
            .then((data) => {
                setComments(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
                setCurrentPage(page);
            })
            .catch((err) => console.error('Failed to fetch comments', err));
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleCommentAdded = (newComment: CommentType) => {
        setComments(prev => insertCommentIntoTree(prev, newComment));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Comments</h1>

                <CommentList comments={comments} onReplyAdded={handleCommentAdded}/>

                {openModal && (
                    <CommentModal
                        onClose={() => setOpenModal(false)}
                        onCommentAdded={handleCommentAdded}
                    />
                )}

                <div className="flex justify-center mb-6 gap-2">
                    <Button
                        onClick={() => prevPage && fetchComments(currentPage - 1)}
                        disabled={!prevPage}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => nextPage && fetchComments(currentPage + 1)}
                        disabled={!nextPage}
                    >
                        Next
                    </Button>
                </div>

                <div className="flex justify-center mb-6">
                    <Button onClick={() => setOpenModal(true)} fullWidth={false} className="px-6">
                        Leave a Comment
                    </Button>
                </div>
            </div>
        </div>
    );
}
