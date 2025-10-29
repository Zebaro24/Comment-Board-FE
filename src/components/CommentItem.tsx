import { CommentType } from '@/types';
import { useState } from 'react';
import CommentModal from './CommentModal';

interface Props {
    comment: CommentType;
    onCommentAdded: (comment: CommentType) => void;
}

export default function CommentItem({ comment, onCommentAdded }: Props) {
    const [replyOpen, setReplyOpen] = useState(false);

    return (
        <div className="border-l-4 border-gray-200 pl-4 mb-4">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">
                    {comment.username}{' '}
                    <span className="text-sm text-gray-500">({comment.email})</span>
                </p>
                <button
                    onClick={() => setReplyOpen(true)}
                    className="text-blue-500 hover:underline text-sm"
                >
                    Reply
                </button>
            </div>

            <p
                className="text-gray-800 my-2"
                dangerouslySetInnerHTML={{ __html: comment.text }}
            ></p>

            {replyOpen && (
                <CommentModal
                    parentId={comment.id}
                    onClose={() => setReplyOpen(false)}
                    onCommentAdded={onCommentAdded}
                />
            )}

            {comment.replies &&
                comment.replies.map(reply => (
                    <CommentItem key={reply.id} comment={reply} onCommentAdded={onCommentAdded} />
                ))}
        </div>
    );
}