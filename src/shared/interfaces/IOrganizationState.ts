import { IOrganization } from "./IOrganization";
import { IProjectDetail } from "./IProjectDetail";

export interface IOrganizationState{
    organizationData:Array<IOrganization>;
    isOrgPopUpOpen:boolean;
}

export interface IProjectState{
    projectData:Array<IProjectDetail>;
    isProjectPopUpOpen:boolean;
}