import "./style.scss";
import { BsFillBoxFill, BsPlus } from "react-icons/bs";
import { ICard } from "../../../shared/interfaces/ICard";
import { getInitials } from "../../../shared/Utility";
import { BiUser } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import ModalPopup from "../../atoms/ModalPopup/ModalPopup";
import { useState } from "react";
import RoleModalContent from "../RolesModalContent/RolesModalContent";
import { IRole } from "../../../shared/interfaces/IProjectDetail";
import { toast } from "react-toast";
import { useSelector } from "react-redux";
import { IState } from "../../../model/interfaces/IState";
import { RbacPermissions } from "../../../shared/rbac/rbacUtility";
let role: string = "";

const Card = (props: ICard) => {
  const {
    title,
    subTitle,
    project,
    owners,
    contributors,
    onCardClickHandler,
    id,
    className,
    deleteHandler,
    roleHandler,
    type,
    data,
  } = props;
  const [isRolePopupOpen, setRolePopup] = useState<boolean>(false);
  const {email} = useSelector((state:IState)=>state.user)
  const toggleRolePopup = (roleType: string) => {
    role = roleType;
    setRolePopup((prev) => !prev);
  };
  const saveRoleHandler = (roleData: IRole) => {
    const userType: string = role === "admin" ? "owners" : "contributors";

    const emailExists = data[userType]?.findIndex(
      (rData: IRole) => rData.email === roleData.email
    );
    if (emailExists !== -1) {
      toast.error(`${roleData.email} email id already exists`);
    } else {
      data[userType]?.push(roleData);
      delete data["_id"];
      if (roleHandler) {
        roleHandler(data);
        setRolePopup(false);
      }
    }
  };
  return (
    <div className={`orgCardContainer ${className}`} key={title} role="button">
      <div className="cardHeader">
        <div
          className="cardTitle"
          role="button"
          onClick={() => onCardClickHandler(id)}
        >
          {title}
        </div>
        {deleteHandler && (
          <div
            className="cardMenu"
            onClick={() => deleteHandler(id, title, type)}
          >
            <AiOutlineDelete />
          </div>
        )}
      </div>
      <div className="cardName">{subTitle}</div>
      <div className="cardFooter">
        {project ? (
          <div className="cardProjects">
            <div className="projIcon">
              <BsFillBoxFill className="cardProjectIcon" />
            </div>
            <div className="cardProjectTitle">
              Projects {project ? <span>{project}</span> : null}
            </div>
          </div>
        ) : null}
        {owners.length ? (
          <div className={`cardMembers ${!project ? "mrgnLft2" : ""}`}>
            <div className="membersTitle">{owners.length} Admin</div>
            <div className="members">
              <div className="initial">{getInitials(owners[0].name)}</div>
              {RbacPermissions[type==="org"?"isUserOrganizationAdmin":"isUserProjectAdmin"](data,email) &&<div
                className="memberPlus"
                onClick={() => toggleRolePopup("admin")}
              >
                <BsPlus />
              </div>}
            </div>
          </div>
        ) : null}

        {RbacPermissions[type==="org"?"isUserOrganizationAdmin":"isUserProjectAdmin"](data,email) &&<div className="cardMembers">
          <div className="membersTitle">
            {contributors?.length ? contributors.length : ""} Collaborators
          </div>
          <div className="members">
            <div className="initial">
              <BiUser />
            </div>
            <div
              className="memberPlus"
              onClick={() => toggleRolePopup("contributor")}
            >
              <BsPlus />
            </div>
          </div>
        </div>}
      </div>
      <ModalPopup
        isOpen={isRolePopupOpen}
        isAction={false}
        onCloseHandler={() => setRolePopup(false)}
        modelContentComponent={
          <RoleModalContent
            role={role}
            btnText={"Add Role"}
            saveHandler={saveRoleHandler}
          />
        }
        className=""
      />
    </div>
  );
};

export default Card;
