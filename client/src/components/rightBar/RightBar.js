import "./RightBar.css";
import { Users } from "../../allData";
import OnlineUser from "../onlineUser/OnlineUser";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
// import axios from "axios";
import publicRequest from "../../axios";

function RightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  // useEffect(() => {
  //   setFollowed(currentUser.followings.includes(user?._id));
  // }, [currentUser, user._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await publicRequest.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [user]);

  const followUser = async () => {
    try {
      if (followed) {
        await publicRequest.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await publicRequest.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }

    setFollowed(!followed);
  };

  const homeRightPage = () => {
    return (
      <>
        <div className="right_bar_head">
          <img
            src="/assets/gift.png"
            alt="pic cadeaux"
            crossOrigin="anonymous"
          />
          <p>
            <strong>Pola Foster</strong> and
            <strong> 3 other friends</strong>
            have a birthday today
          </p>
        </div>

        <div className="right_bar_center">
          <img
            src="/assets/ad.png"
            alt="cold smooth img"
            // crossOrigin="anonymous"
          />
        </div>

        <div className="right_bar_foot">
          <h4>Online Friends</h4>
          <ul className="lists_user_on_ligne">
            {Users.length &&
              Users.map((user) => {
                return <OnlineUser key={user.id} user={user} />;
              })}
          </ul>
        </div>
      </>
    );
  };

  const profileRightPage = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="profileRightBtn" onClick={followUser}>
            {followed ? "Follow" : "Unfollow"}
            {followed ? (
              <IoMdAddCircleOutline size="15" />
            ) : (
              <CiCircleMinus size="15" />
            )}
          </button>
        )}
        <h4 className="profile_title">User Information:</h4>
        <ul className="profile_info">
          <li className="profile_info_item">
            City: <strong>{user?.city || "---"}</strong>
          </li>
          <li className="profile_info_item">
            From: <strong>{user?.from || "---"}</strong>
          </li>
          <li className="profile_info_item">
            Relationship:{" "}
            <strong>
              {user?.relationShip === 1
                ? "Single"
                : user?.relationShip === 2
                ? "Married"
                : "---"}
            </strong>
          </li>
        </ul>
        <h4 className="profile_title">User Friends:</h4>
        <ul className="lists_users_friends">
          {friends.map((friend, i) => {
            return (
              <Link to={`/profile/${friend.username}`} key={friend._id}>
                <li className="user_fr_onligne" id={friend._id}>
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : `${PF}/person/no_avatar.jpg`
                    }
                    alt=""
                    // crossOrigin="anonymous"
                  />
                  <div className="username">
                    {friend.username.length <= 16 ? friend.username : friend.username.slice(0, 16)+"..."}
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <section className="right_bar">
      {user ? profileRightPage() : homeRightPage()}
    </section>
  );
}

export default RightBar;
