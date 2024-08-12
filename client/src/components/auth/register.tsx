import { FormEvent, useRef, useState } from 'react'
import Input from '../../layouts/input';
import { Link } from 'react-router-dom';
import { SET_SESSIONSTORAGE_VALUE } from '../../utils/handle-sessionstorage';
import AUTH_API from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';
export default function Register() {

    const [alertmsg, setmsg] = useState<any>("");
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        try {
            setmsg(<span className="loading loading-spinner loading-xs"></span>)
            e.preventDefault();
            const elements = formRef.current?.elements;
            const email = (elements?.namedItem('email') as HTMLInputElement).value
            const password = (elements?.namedItem('password') as HTMLInputElement).value

            const result = await AUTH_API.post("register", { email, password });

            if (result.status === 201) {
                SET_SESSIONSTORAGE_VALUE('token', result.data.token)
                navigate("/")
            }
        }
        catch (err: any) {
            // console.log(err)
            setmsg(err.response.data.msg)
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="w-auto h-auto p-5 px-10  bg-blend-overlay shadow-lg bg-gray-950 bg-opacity-10 flex flex-col  items-center rounded-lg">

            <div className='my-4'>
                <h1 className='font-semibold text-xl text-center'>
                    Register new Admin
                </h1>
            </div>

            <Input className='my-2 w-96 ' placeholder='Enter your email' name="email" />
            <Input className='my-2 w-96 ' placeholder='Enter your password' type='password' name="password" />

            <button type="submit" className='btn py-0 w-28 my-4'>Create</button>



            <Link to="/auth/login" className='my-1 text-sm font-medium text-slate-500 hover:text-slate-600 text-primary-700'>Login as admin</Link>
            <p className='h-5 text-sm mt-2'>{alertmsg}</p>
        </form>
    )
}
