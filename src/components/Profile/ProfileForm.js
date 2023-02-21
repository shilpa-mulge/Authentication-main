import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const inputPassRef = useRef();
  const ctx = useContext(AuthContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const enterdNewPassword = inputPassRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB2IbR8h8-w-hfsXzEWYgYExp3fG4R8PQ8", {
      method: 'POST',
      body: JSON.stringify({
        idToken: ctx.token,
        password: enterdNewPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {

    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={inputPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
