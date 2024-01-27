import React from 'react';
import {
  EuiForm,
  EuiFormRow,
  EuiRange,
  EuiText,
} from '@elastic/eui';
import './Configuration-elasticsearch.scss';
import { ConfigService } from '../../../services/ConfigService';
import { _SingleRangeChangeEvent } from '@elastic/eui/src/components/form/range/types';

interface ConfigurationElasticsearchProps {
  configService: ConfigService,
}

export function ConfigurationElasticsearch({ configService }: ConfigurationElasticsearchProps) {
  const onJvmSizeChange = (e: _SingleRangeChangeEvent) => {
    configService.params.elasticsearch.jvmSize = parseInt(e.currentTarget.value, 10);
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
            value={configService.params.elasticsearch.jvmSize}
            onChange={onJvmSizeChange}
            showLabels
            showValue
            aria-label="Define the JVM Size of elasticsearch"
            // disabled={isLoading || isModuleOn}
          />
        </>
      </EuiFormRow>
    </EuiForm>
  );
}