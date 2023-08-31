import {
  SET_DEFAULT_ENV_TYPE,
    SET_DEFAULT_ORGANIZATION_ID,
  SET_DEFAULT_PROJECT_ID,
  SET_ERROR_MESSAGE,
  TOGGLE_LOADER,
} from "../../actionType/CommonActionType";
import { InitialState } from "./InitialState";

export const CommonReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case TOGGLE_LOADER: {
      return { ...state, isLoading: action.isLoading };
    }
    case SET_ERROR_MESSAGE: {
      return { ...state, errorMessage: action.errorMessage };
    }
    case SET_DEFAULT_ORGANIZATION_ID: {
        return { ...state, defaultOrgId: action.defaultOrgId };
      }
      case SET_DEFAULT_PROJECT_ID: {
        return { ...state, defaultProjectId: action.defaultProjectId };
      }
      case SET_DEFAULT_ENV_TYPE: {
        return { ...state, defaultEnvType: state.defaultEnvType==="false"?"true":"false" };
      }
    default: {
      return { ...state };
    }
  }
};
