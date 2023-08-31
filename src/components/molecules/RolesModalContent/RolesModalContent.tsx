import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IRole } from "../../../shared/interfaces/IProjectDetail";
import CustomTextBox from "../../atoms/CustomTextBox/CustomTextBox";
import "./style.scss";

interface IProps {
  role: string;
  saveHandler: (roleData: IRole) => void;
  btnText: string;
}
const RoleModalContent = (props: IProps) => {
  const { role, btnText, saveHandler } = props;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const addRoleHandler = () => {
    if(name && email)
    {
        saveHandler({name,email})
    }
  };
  return (
    <div className="roleModalContainer">
      <div className="roleSideContent">About the Role</div>
      <div className="roleContent">
      <div className="roleTitle">Add {role} Role</div>
      <div className="roleFieldBox">
        <div>Add People to {role}</div>
        <div>Name</div>
        <div className="rolesearchContainer">
          <div className="role-search-input-field">
            <CustomTextBox
              type="text"
              placeholder="User Name"
              name="username"
              value={name}
              onChange={(event: any) => setName(event?.target?.value)}
            />
          </div>
        </div>
        <div>Email</div>
        <div>
          <div className="rolesearchContainer">
            <div className="role-search-input-field">
              <AiOutlineMail className="searchicons" />
              <CustomTextBox
                type="email"
                placeholder="Email id"
                name="emailid"
                value={email}
                onChange={(event: any) => setEmail(event?.target?.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`roleSave ${!name || !email ? "disable" : ""}`}>
        <button onClick={addRoleHandler}>{btnText}</button>
      </div>
      </div>
    </div>
  );
};

export default RoleModalContent;
