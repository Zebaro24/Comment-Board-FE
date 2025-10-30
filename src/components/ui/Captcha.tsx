'use client';

import Button from './Button';
import Input from "./Input";

interface CaptchaProps {
    image: string;
    value: string;
    onChange: (v: string) => void;
    onRefresh: () => void;
    fullWidth?: boolean;
}

export default function Captcha({ image, value, onChange, onRefresh, fullWidth = true }: CaptchaProps) {
    return (
        <div className={`${fullWidth ? 'w-full' : 'inline-flex'} flex flex-col gap-2`}>
            {image && (
                <img
                    src={image}
                    alt="CAPTCHA"
                    className="w-40 h-14 object-contain border rounded-lg"
                />
            )}
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter CAPTCHA"
                required
            />
            <Button
                type="button"
                onClick={onRefresh}
                fullWidth={false}
                className="py-1 px-2 text-xs"
            >
                Refresh CAPTCHA
            </Button>
        </div>
    );
}
