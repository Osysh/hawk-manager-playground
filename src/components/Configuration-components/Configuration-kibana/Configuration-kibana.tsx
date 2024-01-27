import React from 'react';
import {
  EuiFieldNumber,
  EuiForm,
  EuiFormRow,
  EuiText,
} from '@elastic/eui';
import './Configuration-kibana.scss';
import { ConfigService } from '../../../services/ConfigService';
import { _SingleRangeChangeEvent } from '@elastic/eui/src/components/form/range/types';

interface ConfigurationKibanaProps {
  configService: ConfigService
}

export function ConfigurationKibana({ configService }: ConfigurationKibanaProps) {
  const onExpirationTimeChange = (e: _SingleRangeChangeEvent) => {
    configService.params.kibana.expirationTime = parseInt(e.currentTarget.value, 10);
  }

  return(
    <EuiForm className="Forms">
      <EuiFormRow
        label={'Logstash workers'}
        labelAppend={
          <EuiText size="xs" />
        }
      >
        <>
          <EuiFieldNumber
            id={'expiracyTime'}
            min={1}
            max={12}
            value={configService.params.kibana.expirationTime}
            onChange={onExpirationTimeChange}
            aria-label="Define expiracy time"
          />
        </>
      </EuiFormRow>
    </EuiForm>
  );
}