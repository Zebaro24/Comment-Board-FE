'use client';

import {ReactNode} from 'react';

export default function CommentCard({children}: { children: ReactNode }) {
    return (
        <div
            className="flex-1 rounded-2xl p-4 backdrop-blur-md bg-gradient-to-r from-red-900/90 via-black/70 to-black/90 border border-white/6 shadow-xl transition transform hover:-translate-y-0.5"
            style={{WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)'}}
        >
            {children}
        </div>
    );
}
