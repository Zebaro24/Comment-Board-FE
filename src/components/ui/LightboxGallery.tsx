'use client';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
    images: string[];
    open: boolean;
    index: number;
    onClose: () => void;
}

export default function LightboxGallery({images, open, index, onClose}: Props) {
    if (!open) return null;

    return (
        <Lightbox
            open={open}
            slides={images.map(src => ({src}))}
            index={index}
            close={onClose}
        />
    );
}
