import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayroomService } from 'src/app/services/playroom.service';
import { BalanceService } from 'src/app/services/balance.service';
import { UserService } from 'src/modules/profile/services/user.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {
  /**
   * @description: 
   */
  @Input() public token: any = undefined;

  /**
   * @description: 
   */
  @Input() public index: number = 0;

  /**
   * @description:
  */
  @Output() public click: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @description: 
   */
  public color_list = [
    {
      id: 'blue', 
      startColor: '#1bb1e8',
      stopColor: '#2456ff',
      text: '#2175f7ff',
    },
    {
      id: 'violet',
      startColor: '#cf39ec',
      stopColor: '#8e1ae6',
      text: '#971ee7ff',
    },
    {
      id: 'yellow',
      startColor: '#f7d70c',
      stopColor: '#f7b50c',
      text: '#b78316ff',
    },
    {
      id: 'black',
      startColor: '#3e3e3ea3',
      stopColor: '#000000',
      text: '#0d0d0dff',
    },
    {
      id: 'red',
      startColor: '#f12e3e',
      stopColor: '#85414f',
      text: '#913f4dff',
    },
    {
      id: 'green',
      startColor: '#3ecb3f',
      stopColor: '#465446',
      text: '#465b46ff', 
    }
  ];

  /**
   * @description: 
   */
  private textXDependingSize = {
    'char_1': 183.18761,
    'char_2': 180.18761,
    'char_3': 174.18761,
  };

  /**
   * @description: 
   */
  public show_dark_circle: boolean = false;


  public color: any = undefined;

  /**
   * @description: 
   */
  constructor(
    private playroomService: PlayroomService,
    private balanceService: BalanceService,
    private userService: UserService,
  ) { }

  /**
   * @description: 
   */
  public ngOnInit(): void {
    this.define_style();
  }

  /**
   * @description:
   */
  public define_style(): void {
    this.color = this.color_list[this.index];
  }

  /**
   * @description:
   */
  public click_token(): void {
    if (!this.userService.is_authenticated()) {
      this.userService.open_login_modal();
      return; 
    };

    if (!this.balanceService.hasSuffisantMoney(this.token.value)) {
      return;
    }
    this.playroomService.send_selected_ticket(this.token);
    this.click.emit(this.token);
  }

  /**
   * @description:
   */
  public get_text_x(text: number): number {
    let char_count = String(text).length;
    let char = 'char_' + char_count;
    if ((this.textXDependingSize as any)[char] === undefined) {
      alert('char ' + char + ' is not defined in token.component.ts');
    }
    return (this.textXDependingSize as any)[char];
  }

}
