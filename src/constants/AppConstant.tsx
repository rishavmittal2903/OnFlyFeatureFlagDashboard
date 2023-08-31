import { IUserContext } from "../model/interfaces/IUserContext";
import { INavigationBar } from "../shared/interfaces/INavigationBar";
import {BsFillBoxFill} from "react-icons/bs"
import {SlOrganization} from "react-icons/sl"
import {GoHomeFill} from "react-icons/go"
import {IoFlagSharp} from "react-icons/io5"
export const userContextData:IUserContext={
    loggedUserId:"1",
    isLoggedIn:true,
    permissions:[]
}

export const dashboardData:Array<INavigationBar>=[

    {
        name:"Home",
        image:<GoHomeFill className="naVicons"/>,
        navigate:"/home"
    },
    {
        name:"Organizations",
        image:<SlOrganization className="naVicons"/>,
        navigate:"/organization"
    },
    {
        name:"Projects",
        image:<BsFillBoxFill className="naVicons"/>,
        navigate:"/projects"

    },
    {
        name:"Feature Flags",
        image:<IoFlagSharp className="naVicons"/>,
        navigate:"/featureFlag"
    }
]