import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
export default function DASHBOARD_ROUTE() {
    return (
        <Routes>

            <Route path="/" element={<Dashboard />}></Route>
        </Routes>
    )
}
