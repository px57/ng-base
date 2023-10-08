import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-dropdown-goback',
  templateUrl: './header-dropdown-goback.component.html',
  styleUrls: ['./header-dropdown-goback.component.scss']
})
export class HeaderDropdownGobackComponent {

  /**
   * @description: 
   */
  @Input()
  public title: string = '';
  
  /**
   * @description:
   */
  @Output()
  public goBack: EventEmitter<void> = new EventEmitter<void>();
}
