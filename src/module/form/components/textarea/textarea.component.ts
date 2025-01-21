import { Component, OnInit, Input, Output, ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  /**
   * @description: 
   */
  @Input() settings:any = '';

  /**
   * @description: 
   */
  public used_caratere: number = 0;

  /**
   * @description: 
   */
  constructor(
  ) {}

  /**
   * @description: 
   */
  public ngOnInit(): void {
    this.settings.ComponentForm.valueChanges.subscribe((val: any) => {
      let messages = val[this.settings.formControlName];
      if (messages === null) {
          messages = '';
      }
      this.used_caratere = messages.length;
    });
  }

  // *** Max length traitements ******
  maxlength() {
    // -> Indique la valeurs maximal de cette éléments
    if (this.settings.maxlength===0) {
      return 9999 * 9999 * 9999;
    }
    return this.settings.maxlength;
  }

  onBlur() {
    if (! this.settings.hasOwnProperty('onBlur')) { return; }
    this.settings.onBlur();
  }
}
