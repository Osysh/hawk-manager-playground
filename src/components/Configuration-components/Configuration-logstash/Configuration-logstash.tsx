import React, { useState } from 'react';
import {
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiText,
} from '@elastic/eui';
import './Configuration-logstash.scss';
import { ConfigService } from '../../../services/ConfigService';
import { _SingleRangeChangeEvent } from '@elastic/eui/src/components/form/range/types';
import { Status } from '../../../types';

interface ConfigurationLogstashProps {
  configService: ConfigService;
  status: Status
}

export function ConfigurationLogstash({ configService, status }: ConfigurationLogstashProps) {
  const [workers, setWorkers] = useState<number>(configService.params.logstash.workers);

  const onWorkersChange = (e: _SingleRangeChangeEvent) => {
    const _workers = parseInt(e.currentTarget.value, 10);

    setWorkers(_workers);
    configService.params.logstash.workers = _workers;
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
            value={workers}
            onChange={onWorkersChange}
            showLabels
            showValue
            aria-label="Define the workers"
            disabled={status === 'on'}
          />
        </>
      </EuiFormRow>
    </EuiForm>
  );
}