import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LibsService } from './libs.service';
import { TrainningService } from './trainning.service';

interface AgoraConfigType {
  appId: string;
  channel: string;
  token: string;
  uid: string;
  sid: string;
  resourceId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  /**
   * @description:
   */
  public config: undefined | AgoraConfigType = undefined;

  /**
   * @description: 
   */
  public constructor(
    private httpService: HttpService,
    private l: LibsService,
    private trainningService: TrainningService,
  ) { }

  /**
   * @description
   */
  public acquire(callback: Function) {
    let channel = this.l.randomList(32);
    let uid = Math.round(Math.random() * 10000);
    let path = `/v1/agora/acquire/?channel=${channel}&uid=${uid}`;

    this.httpService.get(path).subscribe((data: any) => {
      this.config = data;
      callback(data);
    });
  }


  /**
   * @description
   */
  public stop(train_video_config: any) {
    let pathname = `/v1/agora/stop/?`;
    pathname += `channel=${this.config?.channel}`;
    pathname += `&uid=${this.config?.uid}`;
    pathname += `&ressourceId=${this.config?.resourceId}`;
    pathname += `&sid=${this.config?.sid}`;
    pathname += `&question_id=${train_video_config.question.id}`;
    pathname += `&train_id=${train_video_config.train__id}`;

    this.trainningService.eventTrainning.next({
      event: 'stop_trainquestion',
      train__id: train_video_config.train__id,
    });

    this.httpService.get(pathname).subscribe((data: any) => {
      this.trainningService.eventTrainning.next({
        event: 'update_trainquestionlist',
        data: data.trainquestionlist,
        train__id: train_video_config.train__id,
      });
    }).catch((error: any) => {
      this.trainningService.eventTrainning.next({
        event: 'record',
      });
    });
  }
}

