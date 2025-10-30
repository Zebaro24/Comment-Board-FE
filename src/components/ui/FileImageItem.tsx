'use client';

interface Props {
    src: string;
    index: number;
    onClick: (index: number) => void;
}

export default function FileImageItem({src, index, onClick}: Props) {
    return (
        <div className="rounded-md overflow-hidden border border-white/10 shadow-sm">
            <img
                src={src}
                alt={`attachment-${index}`}
                className="object-cover w-48 h-32 cursor-pointer transform transition duration-200 hover:scale-105"
                onClick={() => onClick(index)}
            />
        </div>
    );
}
