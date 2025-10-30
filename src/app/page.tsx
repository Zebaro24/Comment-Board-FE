"use client"
import {useState, useEffect} from 'react';
import {CommentList, CommentModal} from '@/components';
import {CommentType} from '@/types';
import {buildCommentTree} from '@/utils/buildCommentTree';
import {Button} from '@/components/ui';
import {getComments} from '@/services/comments';

export default function Home() {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getComments()
            .then((data) => {
                const tree = buildCommentTree(data);
                setComments(tree);
            })
            .catch((err) => {
                console.error('Failed to fetch comments', err);
            });
    }, []);

    const handleCommentAdded = (newComment: CommentType) => {
        setComments(prev => buildCommentTree([newComment, ...flattenComments(prev)]));
    };

    function flattenComments(tree: CommentType[]): CommentType[] {
        const flat: CommentType[] = [];

        function recurse(list: CommentType[]) {
            for (const c of list) {
                flat.push({...c, replies: []});
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

                <CommentList comments={comments} onReplyAdded={handleCommentAdded}/>

                {openModal && (
                    <CommentModal
                        onClose={() => setOpenModal(false)}
                        onCommentAdded={handleCommentAdded}
                    />
                )}

                <div className="flex justify-center mb-6">
                    <Button onClick={() => setOpenModal(true)} fullWidth={false} className="px-6">
                        Leave a Comment
                    </Button>
                </div>
            </div>
        </div>
    );
}
