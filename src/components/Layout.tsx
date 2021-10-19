import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface PropsInterface {
  children: React.ReactNode,
  // eslint-disable-next-line react/require-default-props
  navbarComponent?: React.FunctionComponent
}

const Layout = ({ children, navbarComponent: NavbarComponent }: PropsInterface) => (
  <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            className="fs-2 ms-3 text-muted text-decoration-none"
          >
            Avito test task
          </Link>
        </Navbar.Brand>
        {NavbarComponent && <NavbarComponent />}
      </Container>
    </Navbar>
    {children}
  </>
);

export default Layout;
