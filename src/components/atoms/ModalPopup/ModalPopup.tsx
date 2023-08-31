import { IModal } from "../../../shared/interfaces/IModal";
import "./style.scss"
const ModalPopup = (props: IModal) => {
  const {
    modelContentComponent,
    isOpen,
    className,
    isAction,
    confirmBtnText,
    modalTitle,
    onCloseHandler,
    onSaveHandler,
  } = props;
  return (
    <>
      {isOpen && (
        <div id="myModal" className={`modal ${className}`}>

        <div className="modal-content">
          <div className="modal-header">
            <span className="close" role="button" onClick={onCloseHandler}>&times;</span>
            {modalTitle &&<h2>{modalTitle}</h2>}
          </div>
          <div className="modal-body">
           {modelContentComponent}
          </div>
          {isAction &&<div className="modal-footer">
            {confirmBtnText &&<button onClick={onSaveHandler}>{confirmBtnText}</button>}
          </div>}
        </div>
      
      </div>
      
      )}
    </>
  );
};

export default ModalPopup;
