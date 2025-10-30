'use client';

import {TextareaHTMLAttributes, forwardRef} from 'react';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
    props,
    ref
) {
    return (
        <textarea
            ref={ref}
            {...props}
            className={`w-full border border-white/20 rounded-lg px-3 py-2 h-24 resize-none text-white bg-black/20 focus:ring-2 focus:ring-red-400 outline-none placeholder-white/70 ${props.className || ''}`}
        />
    );
});

export default Textarea;
