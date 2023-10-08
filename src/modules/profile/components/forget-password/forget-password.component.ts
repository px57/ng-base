import { Component } from '@angular/core';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { HttpService } from 'src/modules/tools/services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  /**
   * @description: 
   */
  public formGroup: FormGroup;

  /**
   * @description: 
   */
  public httpResponse: any = {};

  constructor(
    public switchModalService: SwitchModalService,
    public httpService: HttpService,
  ) {
    this.formGroup = this.getFormGroup();
  }

  /**
   * @description: 
   */
  private getFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(''),
    });
  }

  /**
   * @description:
   */
  public submit(): void {
    if (this.formGroup.invalid) { return; }
    
    // -> [API] - Signin
    const params = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };
    this.httpService.post('auth/signin', params).subscribe((response: any) => {
      this.httpResponse = response;
      if (!response.success) { return; }

    });
  }
}
