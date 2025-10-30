'use client';



export default function CommentContent({text}: { text: string }) {
    return (
        <div
            className="mt-3 text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{__html: text}}
        />
    );
}
