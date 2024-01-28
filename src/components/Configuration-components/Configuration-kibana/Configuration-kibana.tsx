import React, { useState } from 'react';
import {
  EuiFieldNumber,
  EuiForm,
  EuiFormRow,
  EuiText,
} from '@elastic/eui';
import './Configuration-kibana.scss';
import { ConfigService } from '../../../services/ConfigService';
import { _SingleRangeChangeEvent } from '@elastic/eui/src/components/form/range/types';
import { Status } from '../../../types';

interface ConfigurationKibanaProps {
  configService: ConfigService
  status: Status
}

export function ConfigurationKibana({ configService, status }: ConfigurationKibanaProps) {
  const [port, setPort] = useState<number>(configService.params.kibana.port);

  const onPortChange = (e: _SingleRangeChangeEvent) => {
    const _port = parseInt(e.currentTarget.value, 10);
    
    setPort(_port);
    configService.params.kibana.port = _port;
  }

  return(
    <EuiForm className="Forms">
      <EuiFormRow
        label={'Port'}
        labelAppend={
          <EuiText size="xs" />
        }
      >
        <>
          <EuiFieldNumber
            id={'port'}
            value={configService.params.kibana.port}
            onChange={onPortChange}
            aria-label="Define expiracy time"
            disabled={status === 'on'}
          />
        </>
      </EuiFormRow>
    </EuiForm>
  );
}