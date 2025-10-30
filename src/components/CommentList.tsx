import {useState, useMemo} from 'react';
import {CommentType} from '@/types';
import CommentItem from './CommentItem';

interface Props {
    comments: CommentType[];
    onReplyAdded: (reply: CommentType) => void;
}

type SortField = 'username' | 'email' | 'created_at';
type SortOrder = 'asc' | 'desc';

export default function CommentList({comments, onReplyAdded}: Props) {
    const [sortField, setSortField] = useState<SortField>('created_at');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const sortedComments = useMemo(() => {
        return [...comments].sort((a, b) => {
            let aValue: string | Date = '';
            let bValue: string | Date = '';

            switch (sortField) {
                case 'username':
                    aValue = a.username.toLowerCase();
                    bValue = b.username.toLowerCase();
                    break;
                case 'email':
                    aValue = a.email.toLowerCase();
                    bValue = b.email.toLowerCase();
                    break;
                case 'created_at':
                    aValue = new Date(a.created_at);
                    bValue = new Date(b.created_at);
                    break;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [comments, sortField, sortOrder]);

    const toggleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex gap-4 font-semibold mb-2 text-red-600">
                <button onClick={() => toggleSort('username')}>User
                    Name {sortField === 'username' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
                <button
                    onClick={() => toggleSort('email')}>Email {sortField === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
                <button
                    onClick={() => toggleSort('created_at')}>Date {sortField === 'created_at' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
            </div>

            {sortedComments.map(comment => (
                <CommentItem key={comment.id} comment={comment} onCommentAdded={onReplyAdded}/>
            ))}
        </div>
    );
}
