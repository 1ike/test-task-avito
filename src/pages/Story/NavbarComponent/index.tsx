import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsHouseDoor } from 'react-icons/bs';

import styles from './NavbarComponent.module.scss';


const NavbarComponent = () => (
  <Link
    to="/"
    className="fs-2 ms-3 justify-content-end"
  >
    <Button className={styles.button} variant="light">
      <BsHouseDoor className={styles.icon} />
      Back to the News List
    </Button>
  </Link>
);

export default NavbarComponent;
