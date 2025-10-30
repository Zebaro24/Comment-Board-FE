'use client';

import {useState, useRef, ChangeEvent, FormEvent} from 'react';
import {CommentType} from '@/types';
import {ModalWrapper, Input, Textarea, FileUpload, Button} from './ui';
import {createComment} from '@/services/comments';
import {CommentFormValues, validateCommentForm} from "@/utils/validators";

interface CommentModalProps {
    parentId?: number | null;
    onClose: () => void;
    onCommentAdded: (comment: CommentType) => void;
}

export default function CommentModal({parentId = null, onClose, onCommentAdded}: CommentModalProps) {
    const [form, setForm] = useState({username: '', email: '', homepage: '', text: ''});
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [textError, setTextError] = useState('');
    const [preview, setPreview] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));

        if (name === 'text') {
            const validationErrors = validateCommentForm({...form, [name]: value} as CommentFormValues, files);
            const textRelatedError = validationErrors.find(err => err.field === 'text');
            setTextError(textRelatedError ? textRelatedError.message : '');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files ? Array.from(e.target.files) : [];
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

    const wrapSelection = (tag: 'i' | 'strong' | 'code' | 'a') => {
        const el = textareaRef.current;
        if (!el) return;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;
        const selected = form.text.slice(start, end) || '';
        let open = `<${tag}>`;
        let close = `</${tag}>`;
        if (tag === 'a') {
            const href = window.prompt('Enter link URL (http/https or /path):', 'https://');
            if (!href) return;
            open = `<a href="${href}">`;
            close = '</a>';
        }
        const next = form.text.slice(0, start) + open + selected + close + form.text.slice(end);
        setForm(prev => ({...prev, text: next}));

        requestAnimationFrame(() => {
            el.focus();
            const cursor = start + open.length + selected.length + close.length;
            el.setSelectionRange(cursor, cursor);
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const validationErrors = validateCommentForm(form as CommentFormValues, files);
        if (validationErrors.length > 0) {
            setError(validationErrors.map(e => e.message).join('. '));
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', form.username);
            formData.append('email', form.email);
            formData.append('homepage', form.homepage);
            formData.append('text', form.text);
            if (parentId) formData.append('parent', String(parentId));
            files.forEach(file => formData.append('file', file));

            const created = await createComment(formData);
            onCommentAdded(created);
            onClose();
        } catch (err) {
            setError('Failed to send comment. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-2xl font-semibold mb-5 text-center text-white">
                {parentId ? 'Reply to comment' : 'Add a comment'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <Input name="username" value={form.username} onChange={handleChange} placeholder="Username" required/>
                <Input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email"
                       required/>
                <Input name="homepage" value={form.homepage} onChange={handleChange} type="url"
                       placeholder="Homepage (optional)"/>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Button type="button" onClick={() => wrapSelection('i')} fullWidth={false}
                                className="py-1 px-2 text-xs">[i]</Button>
                        <Button type="button" onClick={() => wrapSelection('strong')} fullWidth={false}
                                className="py-1 px-2 text-xs">[strong]</Button>
                        <Button type="button" onClick={() => wrapSelection('code')} fullWidth={false}
                                className="py-1 px-2 text-xs">[code]</Button>
                        <Button type="button" onClick={() => wrapSelection('a')} fullWidth={false}
                                className="py-1 px-2 text-xs">[a]</Button>
                        <div className="ml-auto"/>
                        <Button
                            type="button"
                            onClick={() => setPreview(p => !p)}
                            fullWidth={false}
                            disabled={!!textError || !form.text.trim()}
                            className={`py-1 px-3 text-xs ${!!textError || !form.text.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {preview ? 'Edit' : 'Preview'}
                        </Button>
                    </div>

                    {!preview ? (
                        <>
                            <Textarea ref={textareaRef} name="text" value={form.text} onChange={handleChange}
                                      placeholder="Your comment..." required/>
                            {textError && <p className="text-red-400 text-xs mt-1">{textError}</p>}
                        </>
                    ) : (
                        <div
                            className="w-full min-h-24 border border-white/20 rounded-lg px-3 py-2 text-white bg-black/20">
                            <div className="text-xs text-red-200/80 mb-1">Preview (sanitized)</div>
                            <div className="prose prose-invert max-w-none text-gray-100"
                                 dangerouslySetInnerHTML={{__html: form.text}}/>
                        </div>
                    )}
                </div>

                <FileUpload files={files} onChange={handleFileChange} onRemove={removeFile}/>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>
            </form>
        </ModalWrapper>
    );
}
