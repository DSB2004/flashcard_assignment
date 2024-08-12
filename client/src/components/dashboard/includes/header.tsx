import React, { useState } from 'react'
import { GET_SESSIONSTORAGE_VALUE, DELETE_SESSIONSTORAGE_VALUE } from '../../../utils/handle-sessionstorage'
import { Link } from 'react-router-dom'
export default function Header() {
    const [status, set_status] = useState(GET_SESSIONSTORAGE_VALUE('token') === null);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Flashcard Panel</a>
            </div>
            <div className="flex-none">

                {status ?
                    <>
                        <li className='btn bg-green-900'>
                            <Link to="/auth/login">
                                Login as Admin
                            </Link>
                        </li>
                    </> : <>
                        <li className='btn bg-red-900' onClick={() => {
                            DELETE_SESSIONSTORAGE_VALUE('token')
                            set_status(GET_SESSIONSTORAGE_VALUE('token') === null)
                        }}>
                            Logout
                        </li>

                    </>
                }

            </div>
        </div >
    )
}
