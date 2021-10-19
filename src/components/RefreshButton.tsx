import React from 'react';
import {
  Button, OverlayTrigger, Tooltip, TooltipProps,
} from 'react-bootstrap';
import { BsArrowRepeat } from 'react-icons/bs';
import { Placement } from 'react-bootstrap/types';


const iconSize = 25;
const iconStyle = {
  width: iconSize,
  height: iconSize,
};

/* eslint-disable react/require-default-props */
interface PropsInterface {
  tooltipText?: string;
  tooltipPlacement?: Placement;
  onClick?: () => void;
}
/* eslint-enable react/require-default-props */

const RefreshButton = (props: PropsInterface) => {
  const {
    tooltipText = 'Refresh',
    tooltipPlacement = 'top',
    onClick,
  } = props;
  const renderRefreshTooltip = (tooltipProps: TooltipProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tooltip id="button-tooltip" {...tooltipProps}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={tooltipPlacement} overlay={renderRefreshTooltip}>
      <Button className="ms-5" onClick={onClick}>
        <BsArrowRepeat style={iconStyle} />
      </Button>
    </OverlayTrigger>
  );
};

export default RefreshButton;
