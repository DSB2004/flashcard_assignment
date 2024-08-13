import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {

}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(({ ...props }, ref) => {
    return (

        <textarea
            {...props}
            ref={ref}
            className={`textarea textarea-bordered ${props.className}`}
        />


    );
});

export default Textarea;

