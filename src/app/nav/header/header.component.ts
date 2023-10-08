import { Component } from '@angular/core';
import { PlayroomService } from 'src/app/services/playroom.service';
import { BalanceService } from 'src/app/services/balance.service';
import { UserService } from 'src/modules/profile/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * @description:
   */
  public account_balance: any = 0;
  
  /**
   * @description: 
   */
  public party_time_in_second: number = 0;

  /**
   * @description: 
   */
  public profile_dropdown: boolean = false;

  /**
   * @description:
   */
  constructor(
    public playroomService: PlayroomService,
    public balanceService: BalanceService,
    public userService: UserService,
  ) {
    this.bindPlayroomStream();
    this.bindBalance();
    this.bindStreamUserService();
  }

  /**
   * @description: 
   */
  private bindStreamUserService(): void { 
    this.userService.stream.subscribe((data: any) => {
    });
  }

  /**
   * @description:
   */
  public bindPlayroomStream(): void {
    this.playroomService.stream.subscribe((data: any) => {
      let event_key = 'recept__' + data.event;
      if ((this as any)[event_key] === undefined) {
        alert(event_key + ' is not defined in header.component.ts');
      }
      (this as any)[event_key](data.data);
    });
  }

  /**
   * @description
   */
  private bindBalance(): void {
    this.balanceService.stream.subscribe((balance: number) => {
      this.recept__account_balance(balance);
    });
  }

  /**
   * @description:
   */
  public recept__lottery_ticket_values(data: any): void {
    
  }

  /**
   * @description:
   */
  public recept__party_time(data: any): void {
    // TODO: Delete for the deploy.

    this.party_time_in_second = Math.round(data.time);
    this.party_time_in_second = this.playroomService.get_party_duration() - this.party_time_in_second;
  }

  /**
   * @description:
   */
  public recept__account_balance(account_balance: number) {
    let account_balance_string = account_balance.toString();
    account_balance_string = account_balance_string.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    this.account_balance = account_balance_string;
  }

  /**
   * @description:
   */
  public recept__ticket_list(data: any): void { }

  /**
   * @description: 
   */
  public recept__jackpot(data: any) { }

}
