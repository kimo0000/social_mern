import "./Share.css";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSmile } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext, useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
// import axios from "axios";
import publicRequest from "../../axios";


export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const descRef = useRef();
  
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value
    };

    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await publicRequest.post("/upload", data)
      } catch(err) {
        console.log(err);
      }
    }

    try {
      await publicRequest.post("/posts", newPost);
      console.log(newPost);
      window.location.reload();
      } catch(err) {}
  };

  return (
    <article className="share">
      <div className="share_head">
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : `${PF}/person/no_avatar.jpg`
          }
          alt="img user"
          
        />
        <input
          type="text"
          placeholder={`What's in your mind ${user.username} ?`}
          ref={descRef}
          className="share_input"
        />
      </div>
      <hr />
      {
        file && (<div className="image_posted">
          <img className="share_img" src={URL.createObjectURL(file)} alt="img posted" />
          <FaWindowClose className="cancel_img_share" 
            onClick={() => setFile(null)}
          />
        </div>)
      }
      <form className="share_foot" onSubmit={handleSubmitFile}>
        <div className="share_foot_left">
          <label htmlFor="file" className="photo_video">
            <FaPhotoFilm color="green" size="20" />
            <span htmlFor="file_input">Photo or Video</span>
            <input
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg,.mp4,.mp3"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
          </label>
          <div className="photo_video">
            <FaTag color="blue" size="20" />
            <span>Tag</span>
          </div>
          <div className="photo_video">
            <FaLocationDot color="green" size="20" />
            <span>Location</span>
          </div>
          <div className="photo_video smile">
            <FaSmile size="20" />
            <span>Feeling</span>
          </div>
          <button type="submit" className="share_btn">Share</button>
        </div>
      </form>
    </article>
  );
}
