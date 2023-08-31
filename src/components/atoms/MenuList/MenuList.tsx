import { useEffect } from "react";
import "./style.scss"
interface IProps {
  menuList: Array<string>;
  btnComponent: any;
  onMenuClickHandler: (eventName: string) => void;
  isMenuListVisible:boolean;
  toggleMenuList:()=>void;
}
const MenuList = (props: IProps) => {
  const { menuList, btnComponent, onMenuClickHandler,toggleMenuList,isMenuListVisible } = props;
  useEffect(() => {
    window.onclick = function (event: any) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
     // eslint-disable-next-line 
  }, []);
  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleMenuList}>{btnComponent}</button>
      {isMenuListVisible && <div id="myDropdown" className="dropdown-content">
        {menuList.map((item: string, itemIndex: number) => (
          <div
            key={`${item}_${itemIndex}`}
            role="button"
            onClick={() => onMenuClickHandler(item)}
          >
            {item}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default MenuList;
