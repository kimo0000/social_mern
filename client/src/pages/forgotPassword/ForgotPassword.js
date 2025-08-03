import './ForgotPassword.css'

export default function ForgotPassword() {
  return (
    <section className="forgot_password">
      <h4>Reset Password</h4>
      <form action="">
        <div className="new_password">
          <label htmlFor="new_password">New Password</label>
          <input type="text" id="new_password" placeholder="new password" name="new_password" />
        </div>
        <div className="confirm_password">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="text"
            id="confirm_password"
            placeholder="confirm_password"
            name="confirm_password"
          />
        </div>
        <button type="submit" className="register_btn">
          Confirm Password
        </button>
      </form>
      <p className="register_text">
        you remember your password? <a href="/login">Login</a>
      </p>
    </section>
  )
}
