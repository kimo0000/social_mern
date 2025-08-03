import "./MessageBox.css";
import { format } from "timeago.js";


export default function MessageBox({message, own}) {

  return (
      <>
        <li className={own ? "user_msg own" : "user_msg"}>
          <div className={own ? "user_msg_top own" : "user_msg_top"}>
            <img src="/assets/person/1.jpeg" alt="img box" />
            <span className="msg_user">
              {message.text}
            </span>
          </div>
          <div className="user_msg_bottom">
            <span className="created_at">{format(message.createdAt)}</span>
          </div>
        </li>
      </>
  );
}
