import { IOrganization } from "../../../shared/interfaces/IOrganization";
import { IOrganizationState } from "../../../shared/interfaces/IOrganizationState";
import { LOAD_ORGANIZATIONS, TOGGLE_ORG_POPUP } from "../../actionType/OrganizationActionType";
import { InitialState } from "./InitialState";

export const OrganizationReducer = (state = InitialState, action: any) => {
  const mapOrganizations = (
    state: IOrganizationState,
    organizationData: Array<IOrganization>
  ) => {
    return {
      ...state,
      organizationData,
    };
  };

  const mapOrgFlag = (
    state: IOrganizationState,
    isOrgPopUpOpen: boolean
  ) => {
    return {
      ...state,
      isOrgPopUpOpen,
    };
  };
  switch (action.type) {
    case LOAD_ORGANIZATIONS: {
      return mapOrganizations(state, action.organizationData);
    }
    case TOGGLE_ORG_POPUP: {
      return mapOrgFlag(state, action.isOrgPopUpOpen);
    }
    default: {
      return { ...state };
    }
  }
};
