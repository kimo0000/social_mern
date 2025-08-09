import "./Sidebar.css";
import { MdOutlineRssFeed } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiVideoFill } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoJournal } from "react-icons/io5";
import { BsCalendar2Event } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import CloseFriend from "../closeFriend/CloseFriend";
import { Users } from '../../allData';
console.log(Users, "from Sidebar");

const arrIcons = [
  {
    icon: <MdOutlineRssFeed />,
    text: "Feed",
  },
  {
    icon: <IoChatboxEllipses />,
    text: "Chats",
  },
  {
    icon: <RiVideoFill />,
    text: "Videos",
  },
  {
    icon: <MdGroups2 />,
    text: "Groupes",
  },
  {
    icon: <FaBookmark />,
    text: "Bookmarks",
  },
  {
    icon: <FaRegQuestionCircle />,
    text: "Questions",
  },
  {
    icon: <IoJournal />,
    text: "Jobs",
  },
  {
    icon: <BsCalendar2Event />,
    text: "Events",
  },
  {
    icon: <FaUserGraduate />,
    text: "Courses",
  },
];

// const arrUsers = [
//   {
//     id: 1,
//     img: UserPic,
//     name: "Touati Karim",
//     isActive: true,
//   },
//   {
//     id: 2,
//     img: UserPic,
//     name: "Ikhlas Ben Yousef",
//     isActive: false,
//   },
//   {
//     id: 3,
//     img: UserPic,
//     name: "Touati Lilya",
//     isActive: false,
//   },
// ];

function Sidebar() {
  return (
    <section className="sidebar">
      <ul className="side_icons">
        {
          arrIcons.map((icon) => {
            return (
              <li key={icon.text} className="side_icon">
                {icon.icon}
                <span>{icon.text}</span>
              </li>
            );
          })
        }
      </ul>

      <button className="show_more">Show More</button>

      <ul className="side_users">
        {Users.length && Users.map((user) => (
        <CloseFriend key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
}

export default Sidebar;
