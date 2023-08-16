
import { Navigate, useRoutes } from "react-router-dom";
import {DEFAULT_PATH} from '../config'
import DashboardLayout from '../layouts/dashboard'


export const Router = ()=>{
    return useRoutes([
        {
            element : <DashboardLayout/>,
            path : '/',
            children : [
                [{element : <Navigate to={DEFAULT_PATH.general.app} replace/>,index:true}]
            ]
        }
    ])
}