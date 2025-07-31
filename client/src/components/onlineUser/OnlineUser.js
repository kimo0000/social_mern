import './OnlineUser.css';

export default function OnlineUser({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="list_user_on_ligne">
                 <img src={PF+"/"+user.profilePicture} alt="img"
                  //  crossOrigin="anonymous"
                 />
                 <span className="bull"></span>
                 <span className='username'>{user.username}</span>
              </li>
  )
}
