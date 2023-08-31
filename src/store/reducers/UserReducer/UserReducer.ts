import { LOAD_USER_DATA } from "../../actionType/UserActionType";
import { InitialState } from "./InitialState";

export const UserReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case LOAD_USER_DATA: {
      return { ...state, ...action.userData };
    }
    default: {
      return { ...state };
    }
  }
};
