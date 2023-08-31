import { IProjectState } from "../../../shared/interfaces/IOrganizationState";
import { IProjectDetail } from "../../../shared/interfaces/IProjectDetail";
import { LOAD_PROJECTS, TOGGLE_PROJECT_POPUP } from "../../actionType/ProjectActionType";
import { InitialState } from "./InitialState";

export const ProjectReducer=(state=InitialState, action:any)=>{

    const mapProjects = (
        state: IProjectState,
        projectData: Array<IProjectDetail>
      ) => {
        return {
          ...state,
          projectData,
        };
      };
      const mapProjlag = (
        state: IProjectState,
        isProjectPopUpOpen: boolean
      ) => {
        return {
          ...state,
          isProjectPopUpOpen,
        };
      };
    switch(action.type)
    {
       
        case LOAD_PROJECTS:{
            return mapProjects(state,action.projectData)
        }
        case TOGGLE_PROJECT_POPUP: {
          return mapProjlag(state, action.isProjectPopUpOpen);
        }
        default :{
           return {...state}
        }
    }

}