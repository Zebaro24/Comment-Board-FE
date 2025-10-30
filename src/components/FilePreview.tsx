'use client';

import {useEffect, useState} from 'react';
import {FileType} from '@/types';
import {FileImageItem, FileTextItem} from './ui';
import {getTextFileContent} from "@/services/files";

interface Props {
    files: FileType[];
    onImageClick: (index: number) => void;
}

export default function FilePreview({files, onImageClick}: Props) {
    const [textContents, setTextContents] = useState<Record<number, string>>({});
    const [openedText, setOpenedText] = useState<Record<number, boolean>>({});

    useEffect(() => {
        files.forEach(async (file, idx) => {
            if (file.file_type === 'text' && file.file) {
                try {
                    const text = await getTextFileContent(file.file);
                    setTextContents(prev => ({ ...prev, [idx]: text }));
                } catch {
                    setTextContents(prev => ({ ...prev, [idx]: 'Failed to load content' }));
                }
            }
        });
    }, [files]);

    const toggleText = (idx: number) => {
        setOpenedText(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <div className="mt-4 flex flex-wrap gap-3">
            {files.map((file, idx) => {
                if (file.file_type === 'image')
                    return <FileImageItem key={idx} src={file.file} index={idx} onClick={onImageClick}/>;
                if (file.file_type === 'text')
                    return (
                        <FileTextItem
                            key={idx}
                            name={`text-${idx + 1}.txt`}
                            content={textContents[idx] || 'Loading...'}
                            opened={openedText[idx]}
                            onToggle={() => toggleText(idx)}
                        />
                    );
                return null;
            })}
        </div>
    );
}
