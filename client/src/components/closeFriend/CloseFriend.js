import './CloseFriend.css';

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
      <li key={user.id} className="side_user">
            <img src={PF+user.profilePicture} alt="user img"
            />
            <span className="bulle active"></span>
            <span>{user.username}</span>
          </li>
  )
}
