'use client';

import {CommentType, FileType} from '@/types';
import {useState, useMemo} from 'react';
import CommentModal from './CommentModal';
import CommentCard from './CommentCard';
import CommentHeader from './CommentHeader';
import CommentContent from './CommentContent';
import FilePreview from './FilePreview';
import {LightboxGallery} from './ui';

interface Props {
    comment: CommentType;
    onCommentAdded: (comment: CommentType) => void;
}

export default function CommentItem({comment, onCommentAdded}: Props) {
    const [replyOpen, setReplyOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const images = useMemo(
        () =>
            comment.files?.filter((f: FileType) => f.file_type === 'image').map(f => f.file) || [],
        [comment.files]
    );

    return (
        <div className="mb-6">
            <div className="flex">
                <div className="w-1 mr-4 rounded-full bg-gradient-to-b from-red-500 to-black/80"/>
                <CommentCard>
                    <CommentHeader
                        username={comment.username}
                        email={comment.email}
                        homepage={comment.homepage}
                        createdAt={comment.created_at}
                        onReply={() => setReplyOpen(true)}
                    />
                    <CommentContent text={comment.text}/>
                    <FilePreview
                        files={comment.files || []}
                        onImageClick={(idx) => {
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                        }}
                    />
                </CommentCard>
            </div>

            <LightboxGallery
                images={images}
                open={lightboxOpen}
                index={lightboxIndex}
                onClose={() => setLightboxOpen(false)}
            />

            {replyOpen && (
                <CommentModal
                    parentId={comment.id}
                    onClose={() => setReplyOpen(false)}
                    onCommentAdded={onCommentAdded}
                />
            )}

            <div className="mt-6 ml-10 space-y-6">
                {comment.replies?.map(reply => (
                    <CommentItem key={reply.id} comment={reply} onCommentAdded={onCommentAdded}/>
                ))}
            </div>
        </div>
    );
}
