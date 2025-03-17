
import { FC, useEffect } from "react"
import { SearchList } from "../SearchList/SearchList"
import { Navigate } from "../Navigate/Navigate"
import { Outlet, useLocation } from "react-router-dom"
import { useAppDispatch } from "../../hooks/hooks"


export const MainPage: FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div>
            <div>
                <Navigate />
                {
                    pathname === "/"
                    ? <SearchList />
                    : <Outlet />
                }
                
            </div>
        </div>
    )
}