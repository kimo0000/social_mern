import { useEffect, useState } from "react";
import "./ChatMenu.css";
import publicRequest from "../../axios";

export default function ChatMenu({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (memberId) => memberId !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await publicRequest.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [conversation, currentUser]);

  return (
    <article className="chat_menu">
      <ul className="chat_menu_lists">
        <li className="chat_menu_list">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : PF + "/person/no_avatar.jpg"
            }
            alt="img chat menu"
          />
          <span className="chat_menu_username">{user?.username}</span>
        </li>
      </ul>
    </article>
  );
}
