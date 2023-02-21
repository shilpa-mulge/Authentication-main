import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isClicked, setIsCliked] = useState(false)
  const enterdEmailRef = useRef();
  const entardPasswordRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = e => {
    e.preventDefault();
    setIsCliked(true)
    const enterdEmail = enterdEmailRef.current.value;
    const entardPassword = entardPasswordRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2IbR8h8-w-hfsXzEWYgYExp3fG4R8PQ8", {
      method: 'POST',
      body: JSON.stringify({
        email: enterdEmail, password: entardPassword, returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setIsCliked(false)
      if (response.ok) {

      } else {
        return response.json().then(data => {
          if (data && data.error && data.error.message) {
            window.alert(data.error.message)
          }
          else {
            alert("Authentication faild!")
          }
        })
      }
    })


  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={enterdEmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={entardPasswordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isClicked && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isClicked && <p>Sending....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
