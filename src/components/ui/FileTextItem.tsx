'use client';

interface Props {
    name: string;
    content: string;
    opened: boolean;
    onToggle: () => void;
}

export default function FileTextItem({ name, content, opened, onToggle }: Props) {
    return (
        <div className="w-full max-w-lg bg-black/30 border border-white/8 rounded-lg p-2">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-red-300">{name}</div>
                <button
                    onClick={onToggle}
                    className="text-xs px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition text-red-200"
                >
                    {opened ? 'Hide' : 'Show'}
                </button>
            </div>
            <div
                className={`mt-2 text-sm text-red-100 transition-all duration-300 overflow-hidden ${
                    opened ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <pre
                    className={`whitespace-pre-wrap p-2 rounded-md bg-black/20 border border-white/5 overflow-y-auto ${
                        opened ? 'max-h-80' : 'max-h-0'
                    }`}
                >
                    {content}
                </pre>
            </div>
        </div>
    );
}