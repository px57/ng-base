import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
// import { ChatroomService } from 'src/modules/chatroom/services/chatroom.service';
// import { PlayroomService } from './playroom.service';
import { LibsService } from 'src/modules/tools/services/libs.service';

import { Router, NavigationEnd, NavigationStart } from '@angular/router';

export interface WebSocketsConfig {
  pathname: string;
  port: number;
  service?: any;
  wsService?: any;
  wsStream?: any;
};

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  /**
   * @description: 
   */
  public subject: any = undefined;

  /**
   * @description: 
   */
  public consumerData: any = {};

  /** 
   * @description:
   */
  private websocket_config: Array<WebSocketsConfig> = [ ];

  // /**
  //  * @description: 
  //  */
  // private websocket_config: Array<WebSocketsConfig> = [
  //   {
  //     port: 4242,
  //     pathname: 'ws/chatroom/?room=fr&fakeConnect=true',
  //     service: ChatroomService,
  //   },
  //   {
  //     port: 4242,
  //     pathname: 'ws/playroom/?room=fr&fakeConnect=true',
  //   }
  // ];

  /**
   * @description: 
   */
  constructor(
    private router: Router,
    private l: LibsService,
    // public chatroomService: ChatroomService,
    // public playroomService: PlayroomService,
  ) {
    // this.completeWebsocketConfig();
    // for (const ws_config of this.websocket_config) {
    //   this.connection(ws_config);
    // }
  }

  /**
   * @description: Injection des elements essentielles a la configuration du websocket.
   */
  private completeWebsocketConfig() {
    // const config = [
    //   {
    //     service: this.chatroomService,
    //   },
    //   {
    //     service: this.playroomService,
    //   }
    // ];
    // for (let i = 0; i < config.length; i++) {
    //   this.websocket_config[i].service = config[i].service;
    //   this.websocket_config[i].wsService = this;
    // } 
  }

  /*
   * @description: Ici ont souscrit au différents éléments à envoyer et recevoir.
   */
  public connection(ws_config: WebSocketsConfig): void {
    const url = this.getWebsocketUrl(ws_config)
    ws_config.wsStream = webSocket(url);
    ws_config.wsStream.subscribe(
      (msg: any) => '', // Called whenever there is a message from the server.
      (err: any) => this.error_traitement(ws_config, err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    this.receive(ws_config);
    (window as any).websocket = ws_config.wsStream;
    // this.change_page();
  }

  /*
   * @description: Il serait important par la suite de créer plusieurs possibilité de shéma.
   */
  public receive(ws_config: WebSocketsConfig): void {
    ws_config.service.ws_connection = ws_config;

    try {
      ws_config.wsStream.asObservable().subscribe((msg: any) => {
        for (let key of Object.keys(msg)) {
          const recept_key = `recept__${key}`;
          let recept__function: Function | undefined = ws_config.service[recept_key];
          if (recept__function === undefined) {
            alert (`recept__${key} is not defined`);
            return; 
          }
          ws_config.service[recept_key](msg[key]);
        }
      });
    } catch (e) {}
  }

  /*
   * @description: Recoit les erreurs du flux
   * x. Tenter à la fin de reconnecter le flux.
   */
  public error_traitement(ws_config: WebSocketsConfig, err: any): void {
    console.error('error_traitement'.repeat(1));
    setTimeout(() => {
      this.connection(ws_config);
    }, 1000);
  }

  /**
   * @description: 
   */
  private getWebsocketUrl(ws_config: WebSocketsConfig): string {
    return  `${this.get_protocol()}${this.l.get_host()}:${ws_config.port}/${ws_config.pathname}`;
  }

  /**
   * @description: 
   */
  private get_protocol(): string {
    if (window.location.protocol === 'https:') {
      return 'ws://';
    }
    return 'ws://';
  }

  /**
   * @description: 
   */
  public send(
      ws_connection: WebSocketsConfig | undefined, 
      params: any): void {
    if (ws_connection === undefined) {
      return;
    }
    ws_connection.wsStream.next(params);
  }

  /**
   * @description: Add the websocket config to the list of websocket config.
   * and run the connection.
  */
  public setConfig(ws_config: WebSocketsConfig): void {
    this.websocket_config.push(ws_config);
    ws_config.wsService = this;
    this.connection(ws_config);    
  }
}
