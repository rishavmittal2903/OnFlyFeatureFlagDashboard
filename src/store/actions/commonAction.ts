import { SET_DEFAULT_ORGANIZATION_ID, SET_ERROR_MESSAGE, TOGGLE_LOADER,SET_DEFAULT_PROJECT_ID, SET_DEFAULT_ENV_TYPE } from "../actionType/CommonActionType";

export const toggleLoader=(isLoading:boolean)=>({
    type:TOGGLE_LOADER,
    isLoading
})
export const bindErrorMessage=(errorMessage:string)=>({
    type:SET_ERROR_MESSAGE,
    errorMessage
})
export const bindOrganizationId=(defaultOrgId:string)=>({
    type:SET_DEFAULT_ORGANIZATION_ID,
    defaultOrgId
})
export const bindDefaultProjectId=(defaultProjectId:string)=>({
    type:SET_DEFAULT_PROJECT_ID,
    defaultProjectId
})

export const bindDefaultEnvType=()=>({
    type:SET_DEFAULT_ENV_TYPE
})