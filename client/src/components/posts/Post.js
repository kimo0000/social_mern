import "./Post.css";
import { CiMenuKebab } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
// import axios from "axios";
import publicRequest from "../../axios";


export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user:currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await publicRequest.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const handleClick = () => {
    try {
      publicRequest.put("/posts/"+post._id+"/like", { userId: currentUser._id });
    } catch(err) {};

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="post">
          <div className="post_head">
            <div className="post_left">
              <Link to={`profile/${user.username}`} className="link">
              <img
                src={user.profilePicture ? PF+user.profilePicture : PF+"/person/no_avatar.jpg"}
                alt="Img pic"
                style={{ userSelect: "none" }}
                // crossOrigin="anonymous"
                />
              </Link>
              <strong style={{ userSelect: "none" }}>{user.username}</strong>
              <span>{format(post.createdAt)}</span>
            </div>
            <div className="post_right">
              <CiMenuKebab size="22" />
            </div>
          </div>

        <div className="post_foot">
          <p className="post_foot_desc">{post?.desc}</p>
          <div className="wrapper_img">
            <img src={PF+post?.img} alt="" onClick={handleClick}
              // crossOrigin="anonymous"
            />
          </div>
        </div>
        <div className="like_comment">
          <div className="like_heart">
            <AiFillLike
              className={`like ${isLiked ? "active" : ""}`}
              color="blue"
              size="15"
              onClick={handleClick}
            />
            <FaHeart
              className={`heart ${isLiked ? "active" : ""}`}
              color="red"
              size="15"
              onClick={handleClick}
            />
            <span style={{ userSelect: "none" }}>{like} people like it</span>
          </div>
          <div className="comment" style={{ userSelect: "none" }}>
            {post.comments ? post.comments.length : 0} comments
          </div>
        </div>
      </div>
    </>
  );
}
