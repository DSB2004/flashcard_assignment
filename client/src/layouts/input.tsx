import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    return (

        <input
            {...props}
            ref={ref}
            className={`input input-bordered ${props.className}`}
        />


    );
});

export default Input;

