import { IRole } from "./IProjectDetail";

export interface ICard{
    title:string;
    subTitle:string;
    project:number;
    owners:Array<IRole>;
    key:string;
    contributors?:Array<IRole>;
    id:string;
    className?:string;
    onCardClickHandler:(id:string)=>void;
    type?:string;
    data?:any;
    deleteHandler?:(id:string, name:string,type?:string)=>void;
    roleHandler?:(data?:any, type?:string)=>void;
}