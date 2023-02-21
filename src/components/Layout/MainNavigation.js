import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from './MainNavigation.module.css';
const MainNavigation = () => {
  const history = useHistory();
  const ctx = useContext(AuthContext);
  const logoutHandler = () => {
    ctx.logout();
    history.replace('/auth')

  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !ctx.isLogedin && <li>
              <Link to='/auth'>Login</Link>
            </li>
          }
          {ctx.isLogedin && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {ctx.isLogedin && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
