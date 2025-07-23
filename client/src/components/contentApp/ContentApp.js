import "./ContentApp.css";
import Share from "../share/Share";
import { useState, useEffect, useContext } from "react";
import Post from "../posts/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContextProvider";

function ContentApp({username}) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
      ? await axios.get("/posts/profile/"+username)
      : await axios.get("posts/timeline/"+ user._id);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <section className="content_app">
      {
        (!username || username === user.username) && <Share />
      }
      <article className="posts">
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </article>
    </section>
  );
}

export default ContentApp;
