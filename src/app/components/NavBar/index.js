import { React, useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  const history = useHistory();
  history.listen(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')));
  });
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  return (
    <Navbar
      bg="light"
      variant="light"
      style={{ position: 'fixed', width: '100%', top: '0' }}
    >
      <Container>
        <Navbar.Brand>Menu</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/movies">Movies</Nav.Link>
          <Nav.Link href="/series">Series</Nav.Link>
          <Nav.Link href="/seasons">Seasons</Nav.Link>
          <Nav.Link href="/episodes">Episodes</Nav.Link>
        </Nav>
        {loggedUser != null && (
          <Nav>
            <Nav.Link disabled>Logged as {loggedUser.username}</Nav.Link>
            <Nav.Link
              onClick={() => {
                setLoggedUser(null);
                localStorage.removeItem('user');
                history.push('/login');
              }}
            >
              Sign out
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
