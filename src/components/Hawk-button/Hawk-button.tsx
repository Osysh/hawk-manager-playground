import React from 'react';
// @ts-ignore
import HawkLogo from '../../assets/images/icon_large.png';
import './Hawk-button.scss';

interface HawkButtonProps {
  isLoading: boolean;
  onClick: () => void;
  isClickDisabled: boolean;
}

export function HawkButton({
  isLoading,
  onClick,
  isClickDisabled
}: HawkButtonProps) {
  return(
    <div className="Container">
      <a
        className="Button"
        style={{ cursor: isClickDisabled ? 'not-allowed' : 'pointer' }}
        onClick={() => { if (!isClickDisabled) onClick(); }}
        // href='www.google.com'
      >
        <img className="Hawk-picture" src={HawkLogo} alt='hawk logo' />
      </a>
      {isLoading && <div className="Loader rotate" />}
    </div>
  );
}