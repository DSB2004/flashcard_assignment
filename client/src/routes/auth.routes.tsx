import { Route, Routes } from "react-router-dom";
import Auth from "../pages/auth";
import Login from "../components/auth/login";
import Register from "../components/auth/register";


export default function AUTH_ROUTE() {
    return (
        <Routes>
            <Route path="/auth" element={<Auth />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    )
}
