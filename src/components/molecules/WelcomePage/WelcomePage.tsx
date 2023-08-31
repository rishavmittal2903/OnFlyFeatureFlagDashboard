import { BiPlus } from "react-icons/bi";
import "./style.scss";
interface IProps{
    title:string,
    subTitle:string,
    btnName:string,
    className?:string
    onClickHandler?:()=>void;
}
const WelcomePage = (props:IProps) => {
    const {title,subTitle,btnName,className,onClickHandler} = props;
  return (
    <div className={`welcomeHomeContainer ${className}`}>
      <div className="welcomeText">
        {title}
      </div>
      <div className="subText">
        {subTitle}
      </div>
      <div>
        <button className="actionButton" onClick={onClickHandler}>
          <div className="iconPlus"><BiPlus /></div> <div>{btnName}</div>
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
