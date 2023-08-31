import { IOrganization } from "../interfaces/IOrganization"
import { IProjectDetail, IRole } from "../interfaces/IProjectDetail"
import {IRbacPermissions} from "../interfaces/IRbacPermissions"
export const RbacPermissions:IRbacPermissions=({
    isUserOrganizationAdmin:(orgData:IOrganization, emailId:string)=> orgData?.owners?.filter((role:IRole)=>role?.email===emailId).length?true:false,
    isUserOragnizationContributor:(orgData:IOrganization, emailId:string)=> orgData?.contributors?.filter((role:IRole)=>role.email===emailId).length?true:false,
    isUserProjectAdmin:(projData:IProjectDetail, emailId:string)=> projData?.owners?.filter((role:IRole)=>role?.email===emailId).length?true:false,
    isUserProjectContributor:(projData:IProjectDetail, emailId:string)=> projData?.contributors?.filter((role:IRole)=>role?.email===emailId).length?true:false,
    }
)