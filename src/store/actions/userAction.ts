import axios from "axios";
import { toast } from "react-toast";
import { registerUserUrl, signInUserUrl } from "../../constants/ApiEndpoint";
import { IUserState } from "../../shared/interfaces/IUserState";
import { LOAD_USER_DATA } from "../actionType/UserActionType";
import { toggleLoader } from "./commonAction";

export const bindUserData = (userData: IUserState) => ({
  type: LOAD_USER_DATA,
  userData,
});

export const registerUser = (userData: IUserState, dispatch: any) => {
  return axios
    .post(registerUserUrl, userData)
    .then((res) => {
      if (res && res.status === 201) {
        toast.success("User register successfully");
      } else {
        toast.error(res.data);
      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
      toast.error("User already exists");
      dispatch(toggleLoader(false));
    });
};
export const signInUser = (
  emailId: string,
  password: string,
  dispatch: any
) => {
  return axios
    .post(signInUserUrl, { email:emailId, password })
    .then((res) => {
      if (res && res.status === 200) {
        dispatch(bindUserData({...res.data[0], isAuthenticated:true}));
      } else {
        toast.error(res.data);
      }
      dispatch(toggleLoader(false));
    })
    .catch((err) => {
      console.log(err);
      toast.error("User does not exists");
      dispatch(toggleLoader(false));
    });
};
