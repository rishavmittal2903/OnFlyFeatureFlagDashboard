import { IRole } from "./IProjectDetail";

export interface IOrganization{
    organizationId: string;
    organizationName: string;
    owners: Array<IRole>;
    contributors: Array<IRole>;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}