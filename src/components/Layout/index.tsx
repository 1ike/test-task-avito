import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { BsHouseDoor } from 'react-icons/bs';
import styles from './Layout.module.scss';


const Index = ({ children }: { children: React.ReactNode }) => (
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
        {/* <Navbar.Collapse className="justify-content-end"> */}
        <Link
          to="/"
          className="fs-2 ms-3 justify-content-end"
        >
          {useLocation().pathname !== '/' && (
            <Button className={styles.button} variant="light">
              <BsHouseDoor className={styles.icon} />
              Back to the News List
            </Button>
          )}

        </Link>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
    {children}
  </>
);

export default Index;
