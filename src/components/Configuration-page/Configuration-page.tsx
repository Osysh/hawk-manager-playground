import React from 'react';
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
  EuiToolTip
} from '@elastic/eui';
import { Elk, Status } from '../../types';
import './Configuration-page.scss';
import _ from 'lodash';
import { EngineService } from '../../services/EngineService';

interface ConfigurationPageProps {
  status: Status;
  module: Elk;
  pageComponent: JSX.Element;
  engineService: EngineService
}

export function ConfigurationPage({ status, module, pageComponent, engineService }: ConfigurationPageProps) {
  const launch = () => {
    engineService.on(module);
  }

  const downloadLogs = () => {

  }

  return(
    <div className="Config-page">
      <div className="title-wrapper">
        <EuiText className="title">
          <h4>{_.capitalize(module)}</h4>
        </EuiText>

        <div>
          <EuiToolTip content={`Download ${module} logs`}>
            <EuiButtonEmpty
              iconType="download"
              aria-label="downloadLogs"
              size="xs"
              onClick={downloadLogs}
            />
          </EuiToolTip>

          <EuiToolTip content={status === 'off' ? 'Switch on' : 'Switch off'}>
            <EuiButtonIcon
              aria-label="playStopModule"
              iconType={status === 'off' ? 'play' : 'stopFilled'}
              color={status === 'off' ? 'primary' : 'danger'}
              onClick={launch}
            />
          </EuiToolTip>
        </div>
      </div>

      <EuiHorizontalRule margin="s" />

      <EuiSpacer size='s' />

      {pageComponent}
    </div>
  );
}