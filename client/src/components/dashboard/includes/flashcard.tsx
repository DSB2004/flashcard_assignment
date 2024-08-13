import { useRef, useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { GET_SESSIONSTORAGE_VALUE } from '../../../utils/handle-sessionstorage';
import EditModal, { ModalHandles } from "./modal-edit"

interface FlashcardProps {
    data: {
        id: string;
        ques: string;
        ans: string;
    } | null;
    revalidate: () => void
}

const Flashcard: React.FC<FlashcardProps> = ({ data, revalidate }) => {
    const [rotate, set_rotate] = useState<boolean>(false)
    const modalRef = useRef<ModalHandles>(null);
    if (data === null) {
        return <div className="w-80 h-56 m-5 skeleton">

        </div>
    }
    else {

        return (
            <>
                <EditModal content={data} ref={modalRef} revalidate={revalidate} />
                <div className="flip-card w-80 h-56 m-5">
                    <div className={`flip-card-inner bg-slate-600  rounded-lg
            ${rotate ? "flip-card-rotate-180" : ""}`}>
                        <div className="flip-card-front flex justify-start items-start flex-col p-5">
                            {GET_SESSIONSTORAGE_VALUE('token') === null ?
                                <></> :
                                < button className=' btn w-fit m-2 absolute top-0 right-0' onClick={
                                    () => { modalRef.current?.openModal() }}><MdEdit
                                    /></button>
                            }

                            <p className="mt-5 text-lg font-semibold text-white">Ques</p>
                            <p className='text-sm text-justify w-4/5'>{data.ques}</p>
                            <div className='absolute bottom-2 right-2'>
                                <button className=' w-fit btn' onClick={() => set_rotate(true)}>Answer</button>
                            </div>
                        </div>
                        <div className="flip-card-back  flex justify-start items-start flex-col p-5">

                            <p className="text-lg font-semibold text-white">Answer</p>
                            <p className='text-sm'>{data.ans}</p>
                            <div className='absolute bottom-2 right-2'>
                                <button className=' w-fit btn' onClick={() => set_rotate(false)}>Question</button>
                            </div>
                        </div>
                    </div>
                </div >

            </>
        )
    }
}
export default Flashcard;
