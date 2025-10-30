'use client';

import {InputHTMLAttributes} from 'react';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full border border-white/20 rounded-lg px-3 py-2 text-white bg-black/20 focus:ring-2 focus:ring-red-400 outline-none placeholder-white/70 ${props.className || ''}`}
        />
    );
}
