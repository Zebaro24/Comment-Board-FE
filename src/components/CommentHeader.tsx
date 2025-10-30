'use client';

import {Button} from './ui';

interface Props {
    username: string;
    email: string;
    homepage?: string | null;
    createdAt: string;
    onReply: () => void;
}

export default function CommentHeader({username, email, homepage, createdAt, onReply}: Props) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <div className="flex items-baseline gap-3">
                    <h4 className="text-lg font-semibold text-white">{username}</h4>
                    <span className="text-xs text-red-200/80">{email}</span>
                    <span className="ml-2 text-xs text-gray-300/60">
                        {new Date(createdAt).toLocaleString()}
                    </span>
                </div>
                {homepage && (
                    <a
                        href={homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-red-200/70 hover:underline mt-1 block"
                    >
                        {homepage}
                    </a>
                )}
            </div>
            <Button onClick={onReply} fullWidth={false} className="text-sm py-1 px-3 shadow-sm">
                Reply
            </Button>
        </div>
    );
}
