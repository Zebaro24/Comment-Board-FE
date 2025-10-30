import {CommentType} from '@/types';
import CommentItem from './CommentItem';

interface Props {
    comments: CommentType[];
    onReplyAdded: (reply: CommentType) => void;
}

export default function CommentList({comments, onReplyAdded}: Props) {
    return (
        <div className="max-w-2xl mx-auto">
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} onCommentAdded={onReplyAdded}/>
            ))}
        </div>
    );
}

