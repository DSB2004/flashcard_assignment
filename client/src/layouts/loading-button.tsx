import { FC, ButtonHTMLAttributes, useState } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    asyncFunction: () => Promise<void>
}

const LoadingButton: FC<LoadingButtonProps> = ({ label, asyncFunction, ...props }) => {
    const [state, setState] = useState<any>(label);
    const onClickFunction = async () => {
        setState(<span className="loading loading-spinner loading-xs"></span>)
        await asyncFunction();
        // setState(label)
    }
    return (
        <button type="button" onClick={() => { onClickFunction() }} {...props}>
            {state}
        </button>
    );
};

export default LoadingButton;
