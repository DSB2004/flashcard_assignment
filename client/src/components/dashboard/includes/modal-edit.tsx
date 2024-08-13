import { useImperativeHandle, useRef, ForwardRefRenderFunction, forwardRef } from 'react';
import Textarea from '../../../layouts/textarea';
import LoadingButton from '../../../layouts/loading-button';
import { useDispatch } from 'react-redux';
import DeleteFlashcardThunk from '../../../providers/reducer/flashcard/thunk/remove-flashcard';
import EditFlashcardThunk from '../../../providers/reducer/flashcard/thunk/edit-flashcard';
export interface ModalHandles {
    openModal: () => void;
    closeModal: () => void;
}

const EditModal: ForwardRefRenderFunction<ModalHandles, { content: { id: string, ques: string, ans: string }, revalidate: () => void }> = (props, ref) => {
    const dispatch = useDispatch()
    const localRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const getForm = () => {
        const elements = formRef.current?.elements;
        const ques = (elements?.namedItem('ques') as HTMLInputElement).value
        const ans = (elements?.namedItem('ans') as HTMLInputElement).value
        return { id: props.content.id, ques, ans };
    }

    useImperativeHandle(ref, () => ({
        openModal: () => {
            if (localRef.current) {
                localRef.current.showModal();
                return;
            }
        },
        closeModal: () => {
            if (localRef.current) {
                localRef.current.close();
                return;
            }
        }
    }), []);

    return (
        <dialog className="modal" ref={localRef}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update Flashcard</h3>
                <p className="py-4">Edit the content for flashcard</p>

                <form className='my-3 flex flex-col' ref={formRef}>
                    <Textarea className='w-96 mx-auto my-2' placeholder='Edit the ques...' defaultValue={props.content.ques} name="ques" />
                    <Textarea className='w-96 mx-auto my-2' placeholder='Edit the ans...' defaultValue={props.content.ans} name="ans" />
                    <div className="modal-action">

                        <LoadingButton
                            label="Update"
                            className="btn w-20 hover:bg-yellow-700"
                            asyncFunction={async () => {
                                // @ts-ignore
                                await dispatch(EditFlashcardThunk(getForm())).unwrap()
                                localRef.current?.close();
                                props.revalidate();
                            }} />
                        <LoadingButton
                            label="Delete"
                            className="btn w-20 hover:bg-red-700"
                            asyncFunction={async () => {
                                // @ts-ignore
                                await dispatch(DeleteFlashcardThunk(props.content.id)).unwrap()
                                localRef.current?.close();
                                props.revalidate();
                            }} />
                        <button className="btn" type='button' onClick={() => localRef.current?.close()}>Close</button>

                    </div>
                </form>
            </div>
        </dialog >
    );
};

// Forward the ref correctly using forwardRef
export default forwardRef<ModalHandles, { revalidate: () => void, content: { id: string, ques: string, ans: string } }>(EditModal);
