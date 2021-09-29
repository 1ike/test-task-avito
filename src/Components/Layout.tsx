import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Layout = ({ children }: { children: React.ReactNode }) => (
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
      </Container>
    </Navbar>
    {children}
  </>
);

export default Layout;
