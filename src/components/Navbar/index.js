import { useAuthContext } from 'auth/hooks';
import { titleCase } from 'utils/change-case';
import {
  Bars,
  Nav,
  NavBtn,
  NavBtnLink,
  NavItem,
  NavLink,
  NavMenu,
} from './NavbarElements';

const Navbar = () => {
  const { authenticated, logout, user } = useAuthContext();
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>

          <NavLink to='/team' aria-disabled>
            Teams
          </NavLink>
          {!authenticated && (
            <NavLink to='/auth/jwt/register' activeStyle>
              Sign Up
            </NavLink>
          )}
        </NavMenu>
        {authenticated && (
          <NavItem to='/team' aria-disabled>
            Welcome to Cyber-Secure-Hub,
            <span>{user && titleCase(user.name || user.displayName)}</span>!
          </NavItem>
        )}
        <Bars onClick={logout} />
        <NavBtn>
          {authenticated ? (
            <NavBtnLink to='/auth/jwt/login' onClick={logout}>
              Logout
            </NavBtnLink>
          ) : (
            <NavBtnLink to='/auth/jwt/login'>Sign In</NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
