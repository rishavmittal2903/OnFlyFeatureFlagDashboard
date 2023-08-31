import { ICommonState } from "../../shared/interfaces/ICommonState";
import { IOrganizationState,IProjectState } from "../../shared/interfaces/IOrganizationState";
import { IUserState } from "../../shared/interfaces/IUserState";

export type IState={
    organization:IOrganizationState,
    project:IProjectState,
    common:ICommonState,
    user:IUserState
}