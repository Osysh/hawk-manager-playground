import React, { useEffect, useState } from 'react';
import {
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiGlobalToastList,
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
  EuiToolTip
} from '@elastic/eui';
import { Elk, Status } from '../../types';
import './Configuration-page.scss';
import _ from 'lodash';
import { EngineService } from '../../services/EngineService';
import { ConfigService } from '../../services';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';

interface ConfigurationPageProps {
  status: Status;
  module: Elk;
  pageComponent: JSX.Element;
  engineService: EngineService
  configService: ConfigService
}

export function ConfigurationPage({ status, module, pageComponent, engineService, configService }: ConfigurationPageProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  useEffect(() => {
    configService.onToast.subscribe((toast) => {
    console.log('3')

      setToasts([...toasts, toast])
    })
  }, [])

  const launch = () => {
    if (status === 'off') {
      engineService.on(module);
    } else if (status === 'on') {
      engineService.off(module);
    }
  }

  const removeAllToastsHandler = () => {
    setToasts([]);
  };

  const downloadLogs = (module: string) => {
    const link = document.createElement('a');
    link.href = `../../assets/logs/${module}.log`; // URL to the file
    link.download = `${module}.log`; // The name of the downloaded file

    // Append the link to the body
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link after triggering the download
    document.body.removeChild(link);
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
              onClick={() => downloadLogs(module)}
            />
          </EuiToolTip>

          <EuiToolTip content={status === 'off' ? 'Switch on' : 'Switch off'}>
            <EuiButtonIcon
              aria-label="playStopModule"
              iconType={status === 'off' ? 'play' : 'stopFilled'}
              color={status === 'off' ? 'primary' : 'danger'}
              onClick={launch}
              isDisabled={status === 'loading'}
            />
          </EuiToolTip>
        </div>
      </div>

      <EuiHorizontalRule margin="s" />

      <EuiSpacer size='s' />

      {pageComponent}
      
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeAllToastsHandler}
        toastLifeTimeMs={6000}
      />
    </div>
  );
}