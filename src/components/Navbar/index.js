import { useAuthContext } from 'auth/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'routes/hook';
import colors from 'styles/colors';
import { titleCase } from 'utils/change-case';

const NavbarDemo = () => {
  const { authenticated, logout, user } = useAuthContext();
  const router = useRouter();
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      data-bs-theme='dark'
      style={{
        background: colors.backgroundLighter,
        marginTop: '1rem',
        borderRadius: '16px',
        height: '85px',
        width: '100%',
        zIndex: 10,
        justifyContent: 'space-between',
        boxShadow: '4px 4px 0px ' + colors.bgShadowColor,
      }}
    >
      <Container fluid>
        <Navbar.Brand href='/home'>
          <img
            style={{ width: '48px', height: '48px', marginRight: '0.5rem' }}
            src='/cyber-secure-hub.png'
            alt='Cyber Secure Hub Icon'
          />
          Welcome,
          <span
            style={{
              color: colors.primary,
              fontWeight: 'bold',
              borderRadius: '4px',
              padding: '0.2rem 0.4rem',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                background: colors.primary,
                color: colors.backgroundDarker,
                textDecoration: 'none',
              },
            }}
          >
            {user && titleCase(user.name || user.displayName)}
          </span>
          !
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar`}
          aria-labelledby={`offcanvasNavbarLabel`}
          placement='end'
        >
          <Offcanvas.Header
            closeButton
            style={{
              background: colors.backgroundLighter,
              color: colors.primary,
            }}
          >
            <Offcanvas.Title
              id={`offcanvasNavbarLabel`}
              style={{
                background: colors.backgroundLighter,
                color: colors.primary,
                fontSize: '2rem',
              }}
            >
              <img
                style={{ width: '48px', height: '48px', marginRight: '0.5rem' }}
                src='/cyber-secure-hub.png'
                alt='Cyber Secure Hub Icon'
              />
              Cyber Secure Hub
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              background: colors.backgroundLighter,
              color: colors.primary,
              fontSize: '1.5rem',
              textAlign: 'center',
            }}
          >
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link
                onClick={() => {
                  router.push('/home');
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  router.push('/about');
                }}
              >
                About
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  router.push('/teams');
                }}
              >
                Team
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  router.push('/auth/firebase/login');
                  logout();
                }}
              >
                Logout <FaSignOutAlt />
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarDemo;
