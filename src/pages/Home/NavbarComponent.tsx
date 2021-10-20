import React from 'react';

import RefreshButton from '../../components/RefreshButton';


interface PropsInterface {
  onClick: () => void;
  isFetching: boolean;
}

const NavbarComponent = ({ onClick, isFetching }: PropsInterface) => (
  <div className="me-3">
    <RefreshButton
      tooltipText="Refresh News"
      tooltipPlacement="left"
      onClick={onClick}
      disabled={isFetching}
    />
  </div>
);

export default NavbarComponent;
