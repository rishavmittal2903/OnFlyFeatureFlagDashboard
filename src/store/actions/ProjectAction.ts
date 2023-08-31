import axios from "axios";
import { toast } from "react-toast";
import {
  deleteProjectUrl,
  loadProjectsByOrgIdUrl,
  saveProjectUrl,
} from "../../constants/ApiEndpoint";
import { IProjectDetail } from "../../shared/interfaces/IProjectDetail";
import { LOAD_PROJECTS, TOGGLE_PROJECT_POPUP } from "../actionType/ProjectActionType";
import { bindDefaultProjectId, bindOrganizationId, toggleLoader } from "./commonAction";

export const bindProjects = (projectData: Array<IProjectDetail>) => ({
  type: LOAD_PROJECTS,
  projectData,
});

export const toggleProjPopup = (isProjectPopUpOpen: boolean) => ({
    type: TOGGLE_PROJECT_POPUP,
    isProjectPopUpOpen,
  });

export const getProjectsByOrgId = (orgId: string, dispatch: any) => {
  return axios
    .get(loadProjectsByOrgIdUrl(orgId))
    .then((res: any) => {
      if (res && res?.data) {
        dispatch(bindProjects(res.data));
        dispatch(bindOrganizationId(orgId));

      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveProject = (projectData: IProjectDetail, dispatch: any) => {
  return axios
    .post(saveProjectUrl(), projectData)
    .then((res) => {
      if (res && res.status === 200) {
        toast.success(`${projectData.projectName} project updation successfully.`)
        getProjectsByOrgId(projectData.organizationId, dispatch);
        dispatch(bindDefaultProjectId(projectData.projectId));
        dispatch(toggleProjPopup(false))
      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(toggleLoader(false));
    });
};

export const deleteProjectByOrgIdAndProjId = (
  orgId: string,
  projId:string,
  projectName:string,
  dispatch: any
) => {
  return axios
    .delete(deleteProjectUrl(orgId,projId))
    .then((res) => {
      if (res && res.status === 200) {
        toast.success(`${projectName} project deleted successfully.`)
        getProjectsByOrgId(orgId,dispatch);
      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(toggleLoader(false));
    });
};