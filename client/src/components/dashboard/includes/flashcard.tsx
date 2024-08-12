import { useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";

interface FlashcardProps {
    data: {
        ques: string;
        ans: string;
    };
    revalidate: () => void
}

const Flashcard: React.FC<FlashcardProps> = ({ data }) => {
    const [rotate, set_rotate] = useState<boolean>(false)
    return (
        <div className="flip-card w-80 h-56 m-5">
            <div className={`flip-card-inner bg-slate-600  rounded-lg
            ${rotate ? "flip-card-rotate-180" : ""}`}>
                <div className="flip-card-front flex justify-start items-start flex-col p-5">

                    {/* <div className='absolute top-2 right-2'>
                        <button className=' w-fit m-2 text-2xl text-black' onClick={() => { }}><MdEdit /></button>
                        <button className=' w-fit m-2 text-2xl text-black' onClick={() => { }}><MdDelete /></button>
                        </div> */}

                    <p className="text-lg font-semibold text-white">Ques</p>
                    <p className='text-sm'>{data.ques}</p>
                    <div className='absolute bottom-10 right-10'>
                        <button className=' w-fit btn' onClick={() => set_rotate(true)}>Answer</button>
                    </div>
                </div>
                <div className="flip-card-back  flex justify-start items-start flex-col p-5">

                    <p className="text-lg font-semibold text-white">Answer</p>
                    <p className='text-sm'>{data.ans}</p>
                    <div className='absolute bottom-10 right-10'>
                        <button className=' w-fit btn' onClick={() => set_rotate(false)}>Question</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Flashcard;
