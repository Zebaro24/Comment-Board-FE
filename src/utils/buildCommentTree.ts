import {CommentType} from "@/types";

export function buildCommentTree(comments: CommentType[]): CommentType[] {
    const map = new Map<number, CommentType>();
    const roots: CommentType[] = [];

    comments.forEach(c => map.set(c.id, {...c, replies: []}));

    map.forEach(c => {
        if (c.parent) {
            const parent = map.get(c.parent);
            if (parent) parent.replies?.push(c);
        } else {
            roots.push(c);
        }
    });

    return roots;
}
