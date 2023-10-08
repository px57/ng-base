import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';
import { UserService } from 'src/modules/profile/services/user.service';
import { CapsuleTime } from 'src/app/services/playroom.service';
import { PlayroomService } from 'src/app/services/playroom.service';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-central-button',
  templateUrl: './central-button.component.html',
  styleUrls: ['./central-button.component.scss']
})
export class CentralButtonComponent implements OnChanges {
  /**
   * @description:
   */
  @Input() 
  public caps: CapsuleTime = new CapsuleTime();

  /**
   * @description: 
   */
  @Input()
  public balance: number = 0;

  /**
   * @description: 
   */
  @Input() 
  public bet: number = 0;

  /**
   * @description: 
   */
  @Input()
  public balance_amount: number = 0;

  /**
   * @description:
   */
  @Input()
  public lotery_ticket: Array<number> = [];

  /**
   * @description: 
   */
  @Output() click = new EventEmitter<void>();

  /**
   * @description: The different state of the button.
   * @state.not_authenticated: The user is not authenticated.
   * @state.deposit_fund: The user is authenticated and has not deposited any fund.
   * @state.choose_your_bet: The user has deposited fund and has not selected any bet.
   * @state.bet_has_selected: The user has selected a bet.
   * @state.playrun: The play is running.
   */
  // public state: 'not_authenticated' | 'deposit_fund' | 'choose_your_bet' | 'bet_has_selected' | 'playrun' = 'not_authenticated';
  // public state: 'not_authenticated' | 'deposit_fund' | 'choose_your_bet' | 'bet_has_selected' | 'playrun' = 'deposit_fund';
  // public state: 'not_authenticated' | 'deposit_fund' | 'choose_your_bet' | 'bet_has_selected' | 'playrun' = 'choose_your_bet';
  // public state: 'not_authenticated' | 'deposit_fund' | 'choose_your_bet' | 'bet_has_selected' | 'playrun' = 'bet_has_selected';
  public state: 'not_authenticated' | 'deposit_fund' | 'choose_your_bet' | 'bet_has_selected' | 'playrun' | 'null' = 'null';

  /**
   * @description: 
   */
  public animate: any = {
    login: false,
    signup: false,
    deposit_fund: false,
    choose_your_bet: false,
    play_select_token: false,
  };

  /**
   * @description: 
   */
  public constructor(
    public user_service: UserService,
    public playroom_service: PlayroomService,
    public balance_service: BalanceService,
  ) {
  }

  /**
   * @description: 
   */
  public click_central_button(): void {
    this.click.emit();
  }

  /**
   * @description: 
   */
  public is_not_authenticated(): boolean {
    return this.state === 'not_authenticated';
  }

  /**
   * @description:
   */
  public is_deposit_fund(): boolean {
    return this.state === 'deposit_fund';
  }

  /**
   * @description:
   */
  public is_choose_your_bet(): boolean {
    return this.state === 'choose_your_bet';
  }
  
  /**
   * @description:
   */
  public is_bet_has_selected(): boolean {
    return this.state === 'bet_has_selected';
  }

  /**
   * @description:
   */
  public is_playrun(): boolean {
    return this.state === 'playrun';
  }

  /**
   * @description:
   */
  public is_null(): boolean {
    return this.state === 'null';
  }

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.bindUserStream();
  }

  /**
   * @description:
   */
  public mouseEnter(type: string): void {
    if (this.animate[type] === undefined) {
      console.error(`animate[${type}] is undefined`);
      return;
    }

    this.animate[type] = true;
  }

  /**
   * @description:
   */
  public mouseLeave(type: string): void {
    if (this.animate[type] === undefined) {
      console.error(`animate[${type}] is undefined`);
      return;
    } 


    this.animate[type] = false;
  }

  /**
   * @description:
   */
  public general_click(type: string) {
    switch (type) {
      case 'login':
        this.user_service.redirectToLogin__IfLogout();
        break;
      case 'signup':
        this.user_service.redirectToSignup__IfLogout();
        break;
      case 'deposit_fund':
        alert ('deposit_fund');
        break;
      case 'choose_your_bet':
        alert ('choose_your_bet');
        break;
      case 'play_select_token':
        alert ('play_select_token');
        break;
      default:
        console.error(`type[${type}] is not defined`);
        break;
    }
  }

  /**
   * @description: 
   */
  public update_state(): void {
    // this.state = 'playrun';
    // return;
    if (!this.user_service.data_is_loaded()) {
      this.state = 'null';
      return;
    }
  
    if (!this.user_service.is_authenticated()) {
      this.state = 'not_authenticated';
      return; 
    }
  
    // -> verify if the user has deposited the minimum amount, to play
    if (!this.balance_service.hasSuffisantMoney(this.lotery_ticket[0])) {
      this.state = 'deposit_fund';
      return;
    } else if (this.caps.moment_to_play()) {
      // TODO: Add the event bet selected to the playroom service
      // TODO: Delete this 
      setTimeout(() => {
        this.playroom_service.send_selected_ticket({value: 100});
      }, 1000);
      this.state = 'choose_your_bet';
      // this.state = 'bet_has_selected';
      return;
    } else if (this.caps.random_draw()) {
      this.state = 'playrun';
      return;
    }

    // -> selected bet
    // this.state = ''
  }

  /**
   * @description:
   */
  public ngOnChanges(): void {
    this.update_state();
  }

  /**
   * @description:
   */
  public bindUserStream(): void {
    this.user_service.stream.subscribe((user) => {
      this.update_state();
    });
  }
}
