import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-luck-letter',
  templateUrl: './luck-letter.component.html',
  styleUrls: ['./luck-letter.component.scss']
})
export class LuckLetterComponent {
  /**
   * @description: 
   */
  @Input() 
  public type: 'jackpot_version' | 'central_menu_version' | 'balance' = 'jackpot_version';

  /**
   * @description: \
   */
  private type_params_list = {
    jackpot_version: {
      gradient: true,
      className: 'jackpot-version',
      stroke: '#ffe776',
      fill: 'url(#linearGradient6461)',
    },
    central_menu_version: {
      gradient: false,
      className: 'central-menu-version',
      stroke: '',
      fill: '#c8c8c8ff',
    },
    balance: {
      gradient: false,
      className: 'balance',
      stroke: '',
      fill: '#c8c8c8ff'
    }
  }

  /**
   * @description:
   */
  public selected_type_params: any;

  /**
   * @description:
   */
  constructor() { }

  /**
   * @description:
   */
  public ngOnInit(): void {
    this.defineTypeParams();
  }

  /**
   * @description:
   */
  private defineTypeParams(): void {
    if (this.type_params_list[this.type] === undefined) {
      alert('this.type_params_list[this.type] === undefined');
    }
    this.selected_type_params = this.type_params_list[this.type];
  }
}
