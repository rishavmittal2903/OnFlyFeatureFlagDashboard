export interface IModal{
    modelContentComponent:any;
    isOpen:boolean;
    className:string;
    isAction:boolean;
    cancelBtnText?:string;
    confirmBtnText?:string;
    modalTitle?:string;
    onCloseHandler?:()=>void;
    onSaveHandler?:()=>void;
}