import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";


function Header() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const logout = ()=>{
    localStorage.clear();
    window.location.reload();
  } 

  return (
    <header className="header">
      <Link to="/" title="Home Page" className="logo">Social App</Link>
      <div className="search_timeline">
        <div className="search">
          <input
            type="text"
            placeholder="Search for friends post or video..."
          />
          <CiSearch />
        </div>
        <ul className="time_line">
          <li>Home Page</li>
          <li>Time Ligne</li>
        </ul>
      </div>
      <ul className="icons">
        <li className="icon icon_user">
          <span>1</span>
          <FaUserAlt />
        </li>
        <li className="icon icon_msg">
          <span>4</span>
          <MdMessage />
        </li>
        <li className="icon icon_notification">
          <span>3</span>
          <IoIosNotifications />
        </li>
      </ul>
      <div className="user_loged">
        <Link to={`/profile/${user?.username}`} className="user_link">
        <img src={user.profilePicture ? PF+user.profilePicture : `${PF}person/no_avatar.jpg`} alt="Img" loading="lazy"
          // crossOrigin="anonymous"
        />
        <span>{user.username}</span>
        </Link>
      </div>
      <button onClick={logout}
        title="Logout"
        className="btn_logout"
      >
        <AiOutlineLogout />
      </button>
    </header>
  );
}

export default Header;
