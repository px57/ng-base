


import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../services/http.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-voting-star',
  templateUrl: './voting-star.component.html',
  styleUrls: ['./voting-star.component.css']
})
export class VotingStarComponent implements OnInit {
  @Input() ComponentForm: FormGroup;
  @Input() profile: any = {};
  @Input() star_number: number = 0;
  star_number_hover: number = 0;

  @Input() style_type: string = '';

  public edit = false;
  public starMax = 5;
  public starList: any[] = [];

  /*
  * @description: 
  */
  constructor(
    private _h: HttpService,
    private user: UserService,
  ) {
    this.define_star();
  }

  /*
  * @description:
  */
  public define_star(): void {
    if (this.starList.length !== 0) { return; }
    for (let i = 0; i < this.starMax; i++) {
      this.starList.push({index: i});
    }
  }

  /*
  * @description:
  * x. Commencer par définit la variables qui indiquer que cette éléments est en editions.
  */
  public ngOnInit(): void {
    this.edit = this.ComponentForm !== undefined;
    if (this.edit) { return; }
    this.ComponentForm = new FormGroup({
      star_number: new FormControl(``, [Validators.required]),
    });
  }

  /*
  * @description: 
  *   Met à le jours le votes réalisers.
  */
  public vote(star): void {
    if (!this.edit) { return; }
    this.star_number = star.index + 1;
    this.ComponentForm.patchValue({
      star_number: this.star_number
    });
  }

  /*
  * @description: 
  */
  public starMouseenter(star): void {
    if (!this.edit) { return; }
    this.star_number_hover = star.index + 1;
  }


  private lock = false;

  /*
  * @description: quitter cette elements
  */
  public starMouseleave($index): void {
    if (!this.edit) { return; }
    setTimeout(() => {
      if (this.lock === false) {
        this.lock = true;
        return;
      }
      this.lock = false;
    }, 50);
    this.star_number_hover = 0;
  }
}