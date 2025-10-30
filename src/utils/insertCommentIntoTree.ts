import { CommentType } from '@/types';

export const insertCommentIntoTree = (tree: CommentType[], newComment: CommentType): CommentType[] => {
    if (!newComment.parent) {
        return [newComment, ...tree];
    }

    const insertReply = (comments: CommentType[]): CommentType[] => {
        return comments.map(c => {
            if (c.id === newComment.parent) {
                return {
                    ...c,
                    replies: [newComment, ...c.replies]
                };
            } else if (c.replies.length > 0) {
                return {
                    ...c,
                    replies: insertReply(c.replies)
                };
            }
            return c;
        });
    };

    return insertReply(tree);
};
