import { Component } from '@angular/core';
import { PlayroomService, CapsuleTime } from 'src/app/services/playroom.service';


interface Token {
  value: number,
  selected: boolean,
  hided: boolean,
};

@Component({
  selector: 'app-play-menu',
  templateUrl: './play-menu.component.html',
  styleUrls: ['./play-menu.component.scss']
})
export class PlayMenuComponent {
  /**
   * @description: 
   */
  public left_token_list: Array<Token> = []

  /**
   * @description:
   */
  public right_token_list: Array<Token> = []

  /**
   * @description:
   */
  constructor(
    public playroomService: PlayroomService,
  ) { }

  /**
   * @description: 
   */
  public timelaps: any = {};

  /**
   * @description: 
   */
  public caps: CapsuleTime = new CapsuleTime();

  /**
   * @description
   */
  public balance_amount: number = 0;

  /**
   * @description: 
   */
  public lotery_ticket: Array<number> = [];

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
        alert(event_key + ' is not defined in play-menu.component.ts');
      }
      (this as any)[event_key](data.data);
    });
  }

  /**
   * @description:
   */
  public click_central_button(): void {

  }

  /**
   * @description:
   */
  private generate_token_list(token_list: Array<number>): Array<Token> {
    let token_list_return: Array<Token> = [];
    for (const token of token_list) {
      token_list_return.push({
        value: token,
        selected: false,
        hided: false,
      });
    }
    return token_list_return;
  }

  /**
   * @description: 
   */
  public select_token(token: Token): void {
    for (let token of this.left_token_list) {
      token.selected = false;
      token.hided = false;
    }
    for (let token of this.right_token_list) {
      token.selected = false;
      token.hided = false;
    }

    token.selected = true;

    if (token.selected) {
      for (let token of this.left_token_list) {
        token.hided = true;
      }
      for (let token of this.right_token_list) {
        token.hided = true;
      } 
      token.hided = false
    }
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [RECEPTOR]
  /**
   * @description: Divide the 6 token list in right and left.
   */
  private recept__lottery_ticket_values(data: any): void {
    this.left_token_list = this.generate_token_list(data.slice(0, 3));
    this.right_token_list = this.generate_token_list(data.slice(3, 6));
    this.lotery_ticket = data;
    
  }

  /**
   * @description: Permet de mettre a jours les evenements qui ont en commun une balise 
   */
  public recept__account_balance(balance_amount: number) {
    this.balance_amount = balance_amount;
  }

  /**
   * @description:
   */
  public recept__party_time(data: any) {
    this.timelaps = data.timelaps;
    this.caps = data.caps;
  }

  /**
   * @description:
   */
  public recept__ticket_list(data: any) { }

  /**
   * @description: 
   */
  public recept__jackpot(data: any) { }
}
