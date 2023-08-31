export interface IUserContext{
    loggedUserId:string;
    isLoggedIn:boolean;
    permissions:Array<string>;
}