import React from 'react';
import {
  EuiButton,
  EuiHealth,
  EuiText,
} from '@elastic/eui';
import './Main.scss';

import { HawkButton } from '../Hawk-button/Hawk-button';
import { ConfigService } from '../../services/ConfigService';
import { Status } from '../../types';
import { EngineService } from '../../services';

interface MainProps {
  status: Status;
  engineService: EngineService;
}

export function Main({
  status,
  engineService
}: MainProps) {
  const launch = () => {
    if (status === 'on') {
      engineService.off();
    } else if (status === 'off') {
      engineService.on();
    }
  }

  return(
    <div className="Main-container Main-page">
      <div className="Connection-header">
        <EuiHealth color={ConfigService.prompt[status].color}>
          {ConfigService.prompt[status].text}
        </EuiHealth>
        <EuiText size="s">v3.0.1</EuiText>
      </div>

      <HawkButton
        isLoading={status === 'loading'}
        isClickDisabled={status === 'loading' || status === 'off'}
        onClick={console.log}
      />

      <div>
        <EuiText size="xs" textAlign="center">
          {status === 'off' ? '' : status === 'loading' ? 'Hawk is launching, this may take a few moment' : 'Click on Hawk to open the browser'}
        </EuiText>
      </div>

      <div className="Button-group">
        <EuiButton
          isDisabled={status === 'loading'}
          aria-label="button"
          fullWidth
          onClick={launch}
        >
          {status === 'loading' || status === 'off' ? 'Launch Hawk' : 'Stop Hawk'}
        </EuiButton>
      </div>
    </div>
  );
}