import { Subject } from "rxjs"
import _ from 'lodash';
import { Elk } from "../types"
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";

type Params = {
  [key in Elk]: any;
}

export class ConfigService {
  public onToast: Subject<Toast> = new Subject<Toast>();

  public params: Params = {
    elasticsearch: {
      jvmSize: 1,
      password: 'myPassword',
    },
    kibana: {
      expirationTime: 1, // In hour
      port: 8080
    },
    logstash: {
      workers: 2
    }
  }

  public static prompt = {
    on: {
      color: 'success',
      text: 'On'
    },
    off: {
      color: 'danger',
      text: 'Off'
    },
    loading: {
      color: 'warning',
      text: 'Loading'
    }
  }

  public get(elk: Elk) {
    return this.params[elk];
  }

  public save(param: string, value: any) {
    this.onToast.next({
      id: new Date().getTime.toString(),
      iconType: 'save',
      color: 'primary',
      title: `${_.capitalize(param)} saved`,
    })
  }
}