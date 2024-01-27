import { Elk } from "../types"

type Params = {
  [key in Elk]: any;
}

export class ConfigService {
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
}