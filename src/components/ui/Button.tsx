'use client';

import {ButtonHTMLAttributes} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    fullWidth?: boolean;
}

export default function Button({children, disabled, className, fullWidth = true, ...props}: Props) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`${fullWidth ? 'w-full' : 'inline-flex'} rounded-lg py-2 text-white font-semibold transition ${
                disabled
                    ? 'bg-red-300 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-500'
            } ${className || ''}`}
        >
            {children}
        </button>
    );
}
