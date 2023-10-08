import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  /**
   * @description: 
   */
  @Input() ComponentForm: FormGroup | undefined;

  /**
   * @description: 
   */
  @Input() submit_loading: boolean | undefined;

  /**
   * @description: 
   */
  @Input() value:string = 'Valider';

  /**
   * @description: 
   */
  @Input() list_class_name: string = '';

  /**
   * @description: 
   */
  @Input() parentClass: string = ``;

  /*
  * @description:
  */
  public constructor() { }

  /*
  * @description:
  */
  public ngOnInit(): void {
    // alert(this.ComponentForm.valid)
  }
}
