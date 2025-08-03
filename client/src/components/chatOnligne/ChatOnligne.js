import { useEffect, useState } from "react";
import "./ChatOnligne.css";
// import publicRequest from "publicRequest";
import publicRequest from "../../axios";

export default function ChatOnligne({onligneUsers,currentId,setCurrentChat}) {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onligneFriends, setOnligneFriends] = useState([]);


  useEffect(() => {
    const getfriends = async () => {
      const res = await publicRequest.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getfriends();
  }, [currentId]);

  useEffect(() => {
   setOnligneFriends(friends.filter(friend => onligneUsers.includes(friend._id)))
  }, [friends,onligneUsers]);


  const handleClick = async (user) => {
     try {
      const res = await publicRequest.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
     } catch(err) {
      console.log(err);
     }
  }

  return (
    <>
      {onligneFriends.length ? onligneFriends.map((onligne) => (
          <li className="chat_onligne" key={onligne._id}
            onClick={() => handleClick(onligne)}
          >
            <img src={onligne?.profilePicture ?
             PF+onligne.profilePicture
            : PF+"/person/no_avatar.jpg"
          }
            alt="" />
            <span>{onligne.username}</span>
            <span className="bulle_chat"></span>
          </li>
        ))
       : <span style={{fontSize: "12px", color: "#777"}}>No Friend Onligne</span>
      }
    </>
  );
}
