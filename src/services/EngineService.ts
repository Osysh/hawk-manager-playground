import { BehaviorSubject } from "rxjs";
import { Elk, Status } from "../types"

export class EngineService {
  public onElasticsearchStatusChange: BehaviorSubject<Status> = new BehaviorSubject<Status>('off');
  public onKibanaStatusChange: BehaviorSubject<Status> = new BehaviorSubject<Status>('off');
  public onLogstashStatusChange: BehaviorSubject<Status> = new BehaviorSubject<Status>('off');

  private maxLoadingOnDuration = 4; // In seconds
  private maxLoadingOffDuration = 1; // In seconds

  private generateRandomLoadingDuration = (maxDuration: number) => {
    return Math.floor(Math.random() * maxDuration) + 2;
  }

  private switchOnStep = (emitter: BehaviorSubject<Status>) => {
    const loadingDuration = this.generateRandomLoadingDuration(this.maxLoadingOnDuration);
    emitter.next('loading')

    setTimeout(() => {
      emitter.next('on');
    }, loadingDuration * 1000)
  }

  private switchOffStep = (emitter: BehaviorSubject<Status>) => {
    const loadingDuration = this.generateRandomLoadingDuration(this.maxLoadingOffDuration);
    emitter.next('loading')

    setTimeout(() => {
      emitter.next('off');
    }, loadingDuration * 1000)
  }

  public on(elk?: Elk) {
    switch(elk) {
      case "elasticsearch": {
        this.switchOnStep(this.onElasticsearchStatusChange);
        break;
      }
      case "kibana": {
        this.switchOnStep(this.onKibanaStatusChange);
        break;
      }
      case "logstash": {
        this.switchOnStep(this.onLogstashStatusChange);
        break;
      }
      default: {
        this.switchOnStep(this.onElasticsearchStatusChange);
        this.switchOnStep(this.onKibanaStatusChange);
        this.switchOnStep(this.onLogstashStatusChange);
      }
    }
  }

  public off(elk?: Elk) {
    switch(elk) {
      case "elasticsearch": {
        this.switchOffStep(this.onElasticsearchStatusChange);
        break;
      }
      case "kibana": {
        this.switchOffStep(this.onKibanaStatusChange);
        break;
      }
      case "logstash": {
        this.switchOffStep(this.onLogstashStatusChange);
        break;
      }
      default: {
        this.switchOffStep(this.onElasticsearchStatusChange);
        this.switchOffStep(this.onLogstashStatusChange);
        this.switchOffStep(this.onKibanaStatusChange);
      }
    }
  }
}