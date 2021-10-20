import React from 'react';
import {
  Button, OverlayTrigger, Tooltip, TooltipProps,
} from 'react-bootstrap';
import { BsArrowRepeat } from 'react-icons/bs';
import { Placement } from 'react-bootstrap/types';
import classNames from 'classnames';

import styles from './RefreshButton.module.scss';


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
  disabled?: boolean;
}
/* eslint-enable react/require-default-props */

const RefreshButton = (props: PropsInterface) => {
  const {
    tooltipText = 'Refresh',
    tooltipPlacement = 'top',
    onClick,
    disabled,
  } = props;
  const renderRefreshTooltip = (tooltipProps: TooltipProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tooltip id="button-tooltip" {...tooltipProps}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={tooltipPlacement} overlay={renderRefreshTooltip}>
      <Button className="ms-5" onClick={onClick} disabled={disabled}>
        <BsArrowRepeat style={iconStyle} className={classNames({ [styles.rotating]: disabled })} />
      </Button>
    </OverlayTrigger>
  );
};

export default RefreshButton;
