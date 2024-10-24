import { NavbarLoggedIn } from "./NavbarLoggedIn"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function LayoutLoggedIn () {

    return (
        <div className="flex flex-col">
            <NavbarLoggedIn/>
            <Outlet />

        </div>
    )
}
