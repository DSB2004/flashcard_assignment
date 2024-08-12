import React from 'react'
import { Outlet } from 'react-router-dom'
export default function Auth() {
    return (
        <section className="hero min-h-screen flex items-center justify-center">
            <Outlet />
        </section>
    )
}
