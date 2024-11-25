import { useEffect } from "react"
import { Outlet} from "react-router-dom"
import { AwardNavbar } from "./AwardNavbar"


export function LayoutAwards () {

    return (
        <div className="flex flex-col">
            <AwardNavbar />
            <Outlet className="h-screen"/>
        </div>
    )
}
