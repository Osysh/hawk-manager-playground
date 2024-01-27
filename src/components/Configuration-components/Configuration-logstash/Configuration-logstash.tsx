import React from 'react';
import {
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiText,
} from '@elastic/eui';
import './Configuration-logstash.scss';
import { ConfigService } from '../../../services/ConfigService';
import { _SingleRangeChangeEvent } from '@elastic/eui/src/components/form/range/types';

interface ConfigurationLogstashProps {
  configService: ConfigService
}

export function ConfigurationLogstash({ configService }: ConfigurationLogstashProps) {
  const onJvmSizeChange = (e: _SingleRangeChangeEvent) => {
    configService.params.logstash.workers = parseInt(e.currentTarget.value, 10);
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
          <EuiRange
            id={'logstashWorkers'}
            min={1}
            max={12}
            value={configService.params.logstash.workers}
            onChange={onJvmSizeChange}
            showLabels
            showValue
            aria-label="Define the workers"
          />
        </>
      </EuiFormRow>
    </EuiForm>
  );
}