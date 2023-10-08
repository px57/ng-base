import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketsConfig } from './websocket.service';
import { BalanceService } from './balance.service';
import { UserService } from 'src/modules/profile/services/user.service';
import { CapsuleTime } from 'src/app/classes/capsule-time.class';

export { CapsuleTime };


/**
 * @description:
{
                        bobine: 3,     // -> the bobine of the ticket
                        number: 1,     // -> the number of the ticket
                        whentotime: 7, // -> the time to show in the party
                    } 
 */
export interface PrintRunWinningNumber {
  bobine: number,
  number: number,
  whentotime: number,
  sended?: boolean,
}


/**
 * @description: 
 */
interface TimeStrategyTimeLaps {
  key: string, 
  name: string, 
  time_start: number,
  time_end: number,
};

/**
 * @description: 
 */
interface TimeParty {
  time: number,
  utc_timestamp: number,
  recept_time?: Date,
};

/**
 * @description: 
 */
interface TimeStrategy {
  key: string,
  name: string,
  time_end: number,
  time_start: number,
};

/**
 * @description: 
 */
export interface PlayroomStream {
  event: string,
  data: any,
};

@Injectable({
  providedIn: 'root'
})
export class PlayroomService {
  /**
   * @description: 
   */
  public ws_connection: WebSocketsConfig | undefined;

  /**
   * @description: The stream of data from the websocket 
   */
  public stream: Subject<PlayroomStream> = new Subject<PlayroomStream>();

  /**
   * @description: 
   */
  public stream_winning_number: Subject<any> = new Subject<any>();

  /**
   * @description: 
   */
  private printrun_winning_number: Array<PrintRunWinningNumber> | undefined;

  /**
   * @description: Envoyer une messages pour indiquer que c'est la fin de partie.
   */
  public endpartystream: Subject<any> = new Subject<any>();

  /**
   * @description:
   */
  public caps: CapsuleTime = new CapsuleTime();

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [PARAMS]
  /**
   * @description: 
   * @param.time -> the time in the game in second
   * @param.utc_timestamp the utc timestamp of the game server.
   * @param.recept_time the time when the client receive the message.
   */
  public init_party: TimeParty = {
    time: 0, 
    utc_timestamp: 0,
  };

  /**
   * @description: 
   */
  public party = {
    time: 0,
  };

  /**
   * @description: 
   */
  public timestrategy: Array<TimeStrategy> = [];

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [LOGIC]

  constructor(
    private balanceService: BalanceService,
    private userService: UserService, 
  ) {
    // TODO: Il faut creer un process de reset puissant pour chaque party
    setTimeout(() => {
      this.update_time();
    }, 1000);
  }

  /** 
   * @description: update the time in the game. 
   */
  public update_time() {
    // alert ('aoeoauoea')
    if (this.init_party.recept_time === undefined) {
      setTimeout(() => {
        this.update_time();
      }, 200);
      return;
    }

    // -> La difference entre le temps actuel et le temps de reception de l'initialisation.
    let diff_begin_now: number = (new Date().getTime() / 1000) - this.init_party.recept_time.getTime() / 1000;
    
    // -> La taille d'une partie en seconde.
    let party_duration: number = this.get_party_duration();
    
    // -> La difference entre le temps actuel et le temps de reception de l'initialisation.
    let party = diff_begin_now % party_duration;

    this.party.time = this.init_party.time + party;
    this.party.time = this.party.time % party_duration;

    this.caps = this.getTimeLaps(this.party.time);
    this.stream.next({
      event: 'party_time',
      data: {
        time: this.party.time,
        caps: this.caps,
      },
    });

    // TODO: Il y aurait un bug a ce niveaux.
    try {
      setTimeout(() => {
        this.update_time();
      }, 200);
    } catch (error) { }
  }

  /**
   * @description: Get the duration maximum for the party, based in the timestrategy
   */
  public get_party_duration() { 
    let max_duration_encountred = 0;
    for (let i = 0; i < this.timestrategy.length; i++) {
      const element = this.timestrategy[i];
      if (element.time_end > max_duration_encountred) {
        max_duration_encountred = element.time_end;
      }
    }
    return max_duration_encountred;
  }

  /**
   * @description: 
   * @param data 
   */
  public get_timelaps(timelas: TimeStrategyTimeLaps) {
    return timelas.time_end - timelas.time_start;
  }

  /**
   * @description: 
   */
  public getTimeLaps(time: number) {
    let timelaps: TimeStrategyTimeLaps | undefined;
    let timelaps_list: Array<string> = [];
    console.log(time)
    for (let i = 0; i < this.timestrategy.length; i++) {
      const element = this.timestrategy[i];
      if (time >= element.time_start && time <= element.time_end) {
        timelaps_list.push(element.key);
      }
    }
    console.log(timelaps_list)

    let capsule = new CapsuleTime();
    capsule.list_timelaps = timelaps_list;
    return capsule;
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [RECEPTOR]
  /**
   * @description: 
   */
  public recept__lottery_ticket_values(data: any): void {
    this.stream.next({
      event: 'lottery_ticket_values',
      data: data,
    });
  }

  /**
   * @description: 
   */
  public recept__timestrategy(data: Array<TimeStrategy>): void {
    this.timestrategy = data;
  }

  /**
   * @description: 
   */
  public recept__initparty(data: any): void {
    Object.assign(this.init_party, data);
    this.init_party.recept_time = new Date();
    this.get_party_duration();
  }

  /**
   * @description: 
   */
  public recept__account_balance(data: any) {
    this.balanceService.setBalance(data);
    this.recept__ticket_list(data);
    // this.stream.next({
    //   event: 'account_balance',
    //   data: data,
    // });
  }

  /**
   * @description:
   */
  public recept__party_value(data: any) { }

  /**
   * @description:
   */
  public recept__playing(data: any) { }

  /**
   * @description:
   */
  public recept__ticket_list(data: any) {
    if (typeof data === 'number') {
      return;
    }

    this.stream.next({
      event: 'ticket_list',
      data: data,
    });
  }

  /**
   * @description: 
   */
  public recept__error(data: any) { }

  /**
   * @description: 
   */
  public recept__winner_list(data: any) {

  }

  /**
   * @description: 
   */
  public recept__jackpot(data: any) {
    this.stream.next({
      event: 'jackpot',
      data: data,
    });
  }

  /**
   * @description: 
   */
  public recept__winning_number(data: any) {
    this.printrun_winning_number = data;
    this.printrun_run();
  }

  /**
   * @description:
   */
  public recept__new_party(data: any): void {
    window.location.reload();
  }

  /**
   * @description:
   */
  public send_selected_ticket(ticket: any): void {
    this.ws_connection?.wsService.send(
      this.ws_connection,
      {
        play: ticket.value,
    });
  }

  /**
   * @description:
   */
  public printrun_run(): void {
    setTimeout(() => {
      if (this.printrun_winning_number === undefined) {
        return; 
      };

      if (!this.caps.random_draw()) {
        this.printrun_run(); 
        return;
      }

      for (let bobine of this.printrun_winning_number) {
        if (bobine.sended) { continue; }

        if (bobine.whentotime <= this.party.time) {
          bobine.sended = true;
          this.stream_winning_number.next(bobine);
        }
      }
      this.printrun_run();
    }, 500);
  }

  /**
   * @description:
   */
  public endpartynext(event: 'gameover' | 'win' | 'reset'): void {
    if (!this.userService.is_authenticated()) {
      if (this.caps.random_draw()) {
        this.endpartynext('reset');
      }
      return;
    }
    this.endpartystream.next(event);
  }
}