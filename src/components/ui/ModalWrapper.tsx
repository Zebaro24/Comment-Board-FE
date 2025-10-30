'use client';

import {ReactNode} from 'react';

interface Props {
    children: ReactNode;
    onClose: () => void;
}

export default function ModalWrapper({children, onClose}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <div
                className="relative w-full max-w-lg rounded-2xl bg-gradient-to-r from-red-900/30 via-black/20 to-black/50 border border-white/10 shadow-xl p-6"
                style={{backdropFilter: 'blur(8px)'}}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}
