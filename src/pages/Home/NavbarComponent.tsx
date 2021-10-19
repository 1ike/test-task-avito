import React from 'react';

import RefreshButton from '../../components/RefreshButton';


const NavbarComponent = () => (
  <div className="me-3">
    <RefreshButton
      tooltipText="Refresh News"
      tooltipPlacement="left"
    />
  </div>
);

export default NavbarComponent;
