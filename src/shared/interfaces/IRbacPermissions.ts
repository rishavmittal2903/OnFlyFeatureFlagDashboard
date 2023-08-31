import { IOrganization } from "./IOrganization";
import { IProjectDetail } from "./IProjectDetail";

export interface IRbacPermissions{
    isUserOrganizationAdmin:(orgData:IOrganization, emailId:string)=>boolean,
    isUserOragnizationContributor:(orgData:IOrganization, emailId:string)=>boolean,
    isUserProjectAdmin:(orgData:IProjectDetail, emailId:string)=>boolean,
    isUserProjectContributor:(orgData:IProjectDetail, emailId:string)=>boolean
}