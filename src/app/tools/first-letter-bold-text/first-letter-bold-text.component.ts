import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-letter-bold-text',
  templateUrl: './first-letter-bold-text.component.html',
  styleUrls: ['./first-letter-bold-text.component.scss']
})
export class FirstLetterBoldTextComponent {

  /**
   * @description
   */
  @Input()
  public text: string = '';

  /**
   * @description: 
   */
  @Input()
  public animate: boolean = false;

  /**
   * @description: 
   */
  public text_list: any = [];

  constructor() { }

  /**
   * @description: 
   */
  public ngOnInit(): void {
    this.divideText();
  }

  /**
   * @description:
   */
  private divideText(): void {
    let text_list = [];
    let i = 0;
    let className = `char`;
    for (let char of this.text) {
      if (i === 0) {
        className = `first_letter_bold_text`;
      } else {
        className = ``;
      }
      text_list.push({
        className: className,
        char: char,
      });

      i += 1;
    }
    this.text_list = text_list;
  }

}
