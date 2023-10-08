import { Component } from '@angular/core';
import { PlayroomService } from 'src/app/services/playroom.service';

@Component({
  selector: 'app-jackpot',
  templateUrl: './jackpot.component.html',
  styleUrls: ['./jackpot.component.scss']
})
export class JackpotComponent {
  /**
   * @description: 
   */
  public jackpot: any = '- - -';

  constructor(
    public playroomService: PlayroomService,
  ) { }

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.bindPlayroomStream();
  }

  /**
   * @description:
   */
  public bindPlayroomStream(): void {
    this.playroomService.stream.subscribe((data: any) => {
      let event_key = 'recept__' + data.event;
      if ((this as any)[event_key] === undefined) {
        alert(event_key + ' is not defined in jackpot.component.ts');
      }
      (this as any)[event_key](data.data);
    });
  }

  /**
   * @description:
   */
  private recept__lottery_ticket_values(data: any): void { }

  /**-
   * @description:
   */
  private recept__account_balance(account_balance: number) { }

  /**
   * @description:
   */
  private recept__party_time(data: any) { }

  /**
   * @description:
   */
  public recept__ticket_list(data: any) { }

  /**
   * @description: 
   */
  public recept__jackpot(data: any) {
    this.jackpot = data;
  }
}
