'use client';

import {ChangeEvent} from 'react';

interface Props {
    files: File[];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
}

export default function FileUpload({files, onChange, onRemove}: Props) {
    return (
        <div className="flex flex-col gap-2">
            <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.txt"
                onChange={onChange}
                className="w-full border border-dashed border-white/30 rounded-lg p-2 text-sm text-white/70 bg-black/20"
            />

            {files.length > 0 && (
                <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                    {files.map((f, idx) => (
                        <div key={idx}
                             className="flex items-center justify-between bg-black/30 text-red-200 px-2 py-1 rounded-md">
                            <span className="truncate">{f.name}</span>
                            <button
                                type="button"
                                onClick={() => onRemove(idx)}
                                className="text-xs hover:text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
