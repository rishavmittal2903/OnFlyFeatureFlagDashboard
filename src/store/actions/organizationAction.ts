import axios from "axios";
import { toast } from "react-toast";
import {
  deleteOrganizationUrl,
  loadOrganizationUrl,
  saveOrganizationUrl,
} from "../../constants/ApiEndpoint";
import { IOrganization } from "../../shared/interfaces/IOrganization";
import { LOAD_ORGANIZATIONS, TOGGLE_ORG_POPUP } from "../actionType/OrganizationActionType";
import { store } from "../root/root";
import { toggleLoader } from "./commonAction";

export const bindOrganizations = (organizationData: Array<IOrganization>) => ({
  type: LOAD_ORGANIZATIONS,
  organizationData,
});
export const toggleOrgPopup = (isOrgPopUpOpen: boolean) => ({
  type: TOGGLE_ORG_POPUP,
  isOrgPopUpOpen,
});

export const getOragnizationsData = (emailId: string, dispatch: any) => {
  return axios
    .get(loadOrganizationUrl(emailId))
    .then((res: any) => {
      if (res && res?.data) {
        dispatch(bindOrganizations(res.data));
      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(toggleLoader(false));
    });
};

export const saveOrganization = (
  organizationData: IOrganization,
  dispatch: any
) => {
  return axios
    .post(saveOrganizationUrl(), organizationData)
    .then((res) => {
      if (res && res.status === 200) {
        const emailId= store.getState().user.email;
        toast.success(`${organizationData.organizationName} organization created successfully.`)
        getOragnizationsData(emailId, dispatch);
        dispatch(toggleOrgPopup(false));
      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(toggleLoader(false));
    });
};
export const deleteOrganizationByOrgId = (
  orgId: string,
  orgName:string,
  dispatch: any
) => {
  return axios
    .delete(deleteOrganizationUrl(orgId))
    .then((res) => {
      if (res && res.status === 200) {
        const emailId= store.getState().user.email;
        toast.success(`${orgName} organization deleted successfully.`)
        getOragnizationsData(emailId, dispatch);
        dispatch(toggleOrgPopup(false));
      }
      dispatch(toggleLoader(false));

    })
    .catch((err) => {
      console.log(err);
      dispatch(toggleLoader(false));
    });
};
