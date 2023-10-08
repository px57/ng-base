import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {

  /**
   * @description: 
   */
  @Input()
  public state: boolean = false;

  /**
   * @description:
   */
  public isMultiple: boolean = false;

  @Input()
  public type: 'checkbox' | 'checkbox_circle' = 'checkbox';

  constructor() {}

  ngOnInit(): void {}

  public toggleState(): void {
    this.state = !this.state;
  }
}
