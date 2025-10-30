export interface CommentFormValues {
    username: string;
    email: string;
    homepage?: string;
    text: string;
}

export interface ValidationError {
    field: string;
    message: string;
}

const ALLOWED_TAGS = ['a', 'code', 'i', 'strong'];

const hasUnclosedTags = (text: string): boolean => {
    const stack: string[] = [];
    const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
    let match;

    while ((match = tagRegex.exec(text))) {
        const [full, tagName] = match;
        if (!full.startsWith('</')) stack.push(tagName);
        else {
            if (stack[stack.length - 1] === tagName) stack.pop();
            else return true; // неправильный порядок закрытия
        }
    }

    return stack.length > 0;
};

export function validateCommentForm(values: CommentFormValues, files: File[]): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!values.username.trim()) {
        errors.push({field: 'username', message: 'Username is required'});
    } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
        errors.push({field: 'username', message: 'Username can only contain letters and numbers'});
    }

    if (!values.email.trim()) {
        errors.push({field: 'email', message: 'Email is required'});
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.push({field: 'email', message: 'Invalid email format'});
    }

    if (values.homepage?.trim() && !/^https?:\/\/.+$/i.test(values.homepage)) {
        errors.push({field: 'homepage', message: 'Invalid URL format'});
    }

    if (!values.text.trim()) {
        errors.push({field: 'text', message: 'Comment text is required'});
    } else {
        const foundTags = values.text.match(/<\/?(\w+)[^>]*>/g) || [];
        for (const tag of foundTags) {
            const cleanTag = tag.replace(/[<\/>]/g, '').split(' ')[0];
            if (!ALLOWED_TAGS.includes(cleanTag)) {
                errors.push({field: 'text', message: `Tag <${cleanTag}> is not allowed`});
            }
        }

        if (hasUnclosedTags(values.text)) {
            errors.push({field: 'text', message: 'Some HTML tags are not properly closed'});
        }
    }

    for (const file of files) {
        const fileName = file.name.toLowerCase();

        if (file.type.startsWith('image/')) {
            if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg') && !fileName.endsWith('.png') && !fileName.endsWith('.gif')) {
                errors.push({ field: 'file', message: `${file.name}: Only JPG, PNG, or GIF allowed.` });
            }
        } else if (file.type === 'text/plain') {
            if (!fileName.endsWith('.txt')) {
                errors.push({ field: 'file', message: `${file.name}: Only TXT files allowed.` });
            }
            if (file.size > 100 * 1024) {
                errors.push({ field: 'file', message: `${file.name}: Text file must be ≤ 100KB.` });
            }
        } else {
            errors.push({ field: 'file', message: `${file.name}: Unsupported file type.` });
        }
    }

    return errors;
}