import React, { useState } from 'react';
import {
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiText,
} from '@elastic/eui';
import './Configuration-elasticsearch.scss';
import { ConfigService } from '../../../services/ConfigService';
import { _SingleRangeChangeEvent } from '@elastic/eui/src/components/form/range/types';
import { Status } from '../../../types';

interface ConfigurationElasticsearchProps {
  configService: ConfigService;
  status: Status
}

export function ConfigurationElasticsearch({ configService, status }: ConfigurationElasticsearchProps) {
  const [jvmSize, setJvmSize] = useState<number>(configService.params.elasticsearch.jvmSize);

  const onJvmSizeChange = (e: _SingleRangeChangeEvent) => {
    const _jvmSize = parseInt(e.currentTarget.value, 10);
    
    setJvmSize(_jvmSize);
    configService.params.elasticsearch.jvmSize = _jvmSize;
    configService.save('JVM Size', _jvmSize);
    console.log('1')
  }

  return(
    <EuiForm className="Forms">
      <EuiFormRow
        label={'JVM Size'}
        labelAppend={
          <EuiText size="xs" />
        }
      >
        <>
          <EuiRange
            id={'ElasticsearchJVMSize'}
            min={1}
            max={32}
            value={jvmSize}
            onChange={onJvmSizeChange}
            showLabels
            showValue
            aria-label="Define the JVM Size of elasticsearch"
            disabled={status === 'on'}
          />
        </>
      </EuiFormRow>
    </EuiForm>
  );
}