import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gold-number',
  templateUrl: './gold-number.component.html',
  styleUrls: ['./gold-number.component.scss']
})
export class GoldNumberComponent {
  /**
   * @description: 
   */
  @Input() 
  public number: string | number = '0';

  /**
   * @description:
   */
  @Input()
  public gold: string = 'gold';

  @Input()
  public className: string = '';

  /**
   * @description: 
   */
  @Input()
  public initAnimation: boolean = false;

  /**
   * @description:
   */
  public setTextFill(): string {
    if (this.gold === 'none') {
      return '#fff';
    } else if (this.gold === 'grey') {
      return '#999';
    }
    return 'url(#linearGradient7510)';
  }
}
