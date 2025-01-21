import {
  Component,
  OnInit,
  Input,
  OnChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoockingService } from './../../services/boocking.service';
import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpenCloseElementService } from './../../services/open-close-element.service';
import { HttpService } from './../../services/http.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibsService } from './../../services/libs.service';

@Component({
  selector: 'app-star-voting-space',
  templateUrl: './star-voting-space.component.html',
  styleUrls: ['./star-voting-space.component.css']
})
export class StarVotingSpaceComponent implements OnInit, OnChanges {
  @Input() public is_customer: boolean = false;
  @Input() public is_creator: boolean = false;
  @Input() public customer: any = {};
  @Input() public order: any = {};
  @Input() public comment: any = null;
  @Input() public parentComponent: any = {};

  public ComponentForm: FormGroup;
  public submitLoading = false;
  public textareaSettings: any = {
    placeholder: "How was it for you?",
    maxlength: 300,
    ComponentForm: this.ComponentForm,
    formControlName: 'comment',
    required: true,
  };

  public showStarVotingSpace: boolean = false;

  constructor(
    private h: HttpService,
    private boockingService: BoockingService,
    private userService: UserService,
    private l: LibsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  /*
  * @description:
  */
  public ngOnInit(): void {
    let star_number: any = ``;
    if (this.comment !== null) {
      star_number = String(this.comment.star_number);
    }
    this.ComponentForm = new FormGroup({
      star_number: new FormControl(star_number, [Validators.required]),
      comment: new FormControl(``, [Validators.required]),
    });
    this.textareaSettings.ComponentForm = this.ComponentForm;
  }

  /*
  * @description:
  */
  public ngSubmit(): void {
    if (!this.ComponentForm.valid) { return null; }
    this.submitLoading = true;

    const process: string | undefined = this.boockingService.isProductData(this.order) ? 'product': undefined;
    const url: string = this.boockingService.isProductData(this.order) ?
      `profile/comment/publish_comment_and_star_for_product` :
      `profile/comment/publish_comment_and_star_for_videocall`;

    this.boockingService.post(
      url,
      this.ComponentForm.value,
      process
    ).subscribe((response: any) => {
      this.submitLoading = false;

      this.comment = response.comment;
      // this.boockingService.redirectToCommentPage();
    });
  }

  /*
  * @description:
  */
  private define_showStarVotingSpace(): void {
    if (this.order.state !== `completed`) {
      return;
    }

    if (this.is_creator) {
      this.showStarVotingSpace = this.comment !== null;
      return;
    }
    this.showStarVotingSpace = true;
  }

  /*
  * @description:
  */
  public ngOnChanges(data: any): void {
    this.define_showStarVotingSpace();
  }
}
