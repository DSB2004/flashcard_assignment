import React, { useEffect, useState } from 'react'
import Flashcard from './flashcard'
import { useSearchParams } from 'react-router-dom'
import GetFlashcardThunk from '../../../providers/reducer/flashcard/thunk/get-flashcard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CardPanel() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // @ts-ignore
    const flashcard_state = useSelector(state => state.FLASHCARD_REDUCER)
    const [searchParams] = useSearchParams();
    const [content, setcontent] = useState<{ QUES: string, ANS: string }[]>([]);
    const page = searchParams.get('page');

    const revalidate = async () => {
        let result;
        if (page) {
            // @ts-ignore
            result = await dispatch(GetFlashcardThunk(page)).unwrap();
        }
        else {
            // @ts-ignore
            result = await dispatch(GetFlashcardThunk(1)).unwrap();

        }
        setcontent(result.data)
    }

    useEffect(() => {
        // console.log()
        if (!flashcard_state.content[page]) {
            revalidate()
        }
        else {
            setcontent(flashcard_state.content[page]);
        }
    }, [page])
    return (
        <>
            <div className='mt-2 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6' >

                {
                    content.map(ele => <Flashcard data={{ ques: ele.QUES, ans: ele.ANS }} revalidate={() => revalidate()} />)
                }
            </div >
            <div className='m-5 my-10 flex justify-between'>
                <button className='btn w-28 bg-slate-600'
                    onClick={
                        () => {
                            if (page && parseInt(page) > 1) {
                                navigate(`/?page=${page ? parseInt(page) - 1 : ""}`)
                            }
                        }}
                >Previous</button>
                <button className='btn w-28 bg-slate-600' onClick={
                    () => {
                        if (content.length === 10) {
                            navigate(`/?page=${page ? parseInt(page) + 1 : 2}`)
                        }
                    }}>Next</button>
            </div>
        </>


    )
}
