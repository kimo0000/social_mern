import "./Profile.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/Sidebar";
import ContentApp from "../../components/contentApp/ContentApp";
import RightBar from "../../components/rightBar/RightBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import publicRequest from "publicRequest";

import publicRequest from "../../axios";

export default function Profile() {
  const { username } = useParams();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await publicRequest.get(`/users?username=${username}`);
      setUser(res.data);
    };

    fetchUser();
  }, [username]);

  return (
    <div className="profile">
      <Header />
      <SideBar />
      <section className="profile_top">
        <img
          className="profile_user"
          src={
            user.coverPicture
              ? PF + user.coverPicture
              : `${PF}person/no_profile.jpg`
          }
          alt="img cover"
        />
        <img
          className="img_user"
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : `${PF}/person/no_avatar.jpg`
          }
          alt="img profile"
        />
        <div className="user_info">
          <h4 className="profile_name">{user.username}</h4>
          <div className="profile_desc">{user.desc}</div>
        </div>
      </section>
      <ContentApp username={username} />
      <RightBar user={user} />
    </div>
  );
}
