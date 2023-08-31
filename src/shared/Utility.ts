import { IOrganization } from "./interfaces/IOrganization";
import {
  IEnvironmentType,
  IFlagData,
  IProjectDetail,
} from "./interfaces/IProjectDetail";

export const getInitials = (name: string): string => {
  if (!name) return "";
  var names = name.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const encode = (
  orgId: string,
  projId: string,
  envType: string
): string => {
  return btoa(`${orgId}:${projId}:${envType}`);
};

export const getFilteredOrganizationData = (
  organizationData: Array<IOrganization>,
  orgId: string
) => {
  return organizationData.find(
    (data: IOrganization) => data.organizationId === orgId
  );
};
export const getFilteredProjectData = (
  projectData: Array<IProjectDetail>,
  projId: string
) => {
  return projectData.find((data: IProjectDetail) => data.projectId === projId);
};

export const getAllFlags = (projectData: IProjectDetail, envType: string) => {
  return (
    projectData?.environments?.find(
      (flag: IEnvironmentType) => flag.envType === envType
    )?.flagData?.length || 0
  );
};
export const getActiveFlags = (
  projectData: IProjectDetail,
  envType: string
) => {
  const flagData: Array<IFlagData> | undefined = projectData?.environments?.find(
    (flag: IEnvironmentType) => flag.envType === envType
  )?.flagData;
  return flagData
    ? flagData?.filter((flg: IFlagData) => flg.isFlagEnabled).length || 0
    : 0;
};

export const getFlagData = (
  projectData: IProjectDetail,
  envType: string
):Array<IFlagData> => {
  const flagData: Array<IFlagData> | undefined = projectData?.environments?.find(
    (flag: IEnvironmentType) => flag.envType === envType
  )?.flagData;
  return flagData || []
};

export const getIndex = (
  projectData: IProjectDetail,
  envType: string
):number => {
  return projectData?.environments?.findIndex(
    (flag: IEnvironmentType) => flag.envType === envType
  );
};

export const getAllFlagDataForNewEnvironment=(flagData:Array<IFlagData>)=>{
const flags=flagData?.map((flags:IFlagData)=>({envType:flags.envType,flagName:flags.flagName, isFlagEnabled:false}));
return flags || [];
}

export const getClientId=(project:IProjectDetail, envType:string)=>{
  return project?.environments.find((env:IEnvironmentType)=>env.envType===envType)?.envId || "";
  }
