const baseUrl:string = process.env.REACT_APP_BASE_URL || "";
export const loadOrganizationUrl=(emailId:string)=>`${baseUrl}/api/v1/organizations/${emailId}`
export const loadProjectsByOrgIdUrl=(orgId:string,emailId:string)=>`${baseUrl}/api/v1/allProjects/${emailId}/${orgId}`
export const saveOrganizationUrl=()=>`${baseUrl}/api/v1/organization`
export const saveProjectUrl=()=>`${baseUrl}/api/v1/project`
export const deleteOrganizationUrl=(id:string)=>`${baseUrl}/api/v1/organization/${id}`
export const deleteProjectUrl=(orgId:string,projectId:string)=>`${baseUrl}/api/v1/project/${projectId}/${orgId}`
export const updateRolesByProjectIdUrl=(projectId:string)=>`${baseUrl}/api/v1/projRoles/${projectId}`
export const updateRolesByOrgIdUrl=(orgId:string)=>`${baseUrl}/api/v1/organizationRoles/${orgId}`
export const registerUserUrl=`${baseUrl}/api/v1/users`
export const signInUserUrl=`${baseUrl}/api/v1/userData`

