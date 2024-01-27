import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  EuiButtonIcon,
  EuiText,
  EuiToolTip
} from '@elastic/eui';
import './Header.scss';

interface HeaderProps {
  onReduceWindow: (isM: boolean) => void;
}

export function Header({ onReduceWindow }: HeaderProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(false); 

  const location = useLocation();
  console.log(location.pathname, location.pathname === '/')

  const onMinimise = () => {
    setIsMinimized(isMinimized => !isMinimized);
    onReduceWindow(!isMinimized);
  }

  return (
    <div className="Header">
      <Link to='/'>
        <EuiButtonIcon
          aria-label="menuButton"
          style={{ margin: '0 10px' }}
          iconType="returnKey"
          display="fill"
          onClick={() => {}}
          isDisabled={location.pathname === '/'}
        />
      </Link>
      <EuiText className="Title Drag" color="ghost" size="m">
        Hawk manager
      </EuiText>
      <div className="Window-tools">
        <EuiToolTip
          position="top"
          content={
            <p>
              Reduce window !
            </p>
          }
        >
          <EuiButtonIcon
            className="Window-icon"
            iconType={isMinimized ? "arrowUp" : "minus"}
            aria-label="reduceWindow"
            onClick={onMinimise}
          />
        </EuiToolTip>
      </div>
    </div>
  );
}