import { Component, OnInit, Input } from "@angular/core";
import { FormsService } from "src/modules/form/services/forms.service";



@Component({
  selector: "app-form-error",
  templateUrl: "./form-error.component.html",
  styleUrls: ["./form-error.component.css"],
})
export class FormErrorComponent implements OnInit {
  @Input() httpResponse: any = {};
  @Input() inputName: string | undefined;
  public error_msg: string | undefined;

  constructor(
    private formsService: FormsService,
  ) {}

  /**
   * @description: Initialisation du composant.
   */
  public ngOnInit(): void {
    
  }

  /*
   * @description:
   */
  public ngOnChanges(changes: any): void {
    // if (this.formsService.notHasError(this.httpResponse, this.inputName)) {
    //   this.error_msg = undefined;
    //   return;
    // }

    this.error_msg = this.formsService.getErrorMsg(this.httpResponse, this.inputName);
  }
}
