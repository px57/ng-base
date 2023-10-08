import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/modules/profile/services/user.service';

@Component({
  selector: 'app-header-profile-dropdown',
  templateUrl: './header-profile-dropdown.component.html',
  styleUrls: ['./header-profile-dropdown.component.scss']
})
export class HeaderProfileDropdownComponent {

  /**
   * @description:
   */
  @Output()
  public close: EventEmitter<any> = new EventEmitter();

  /**
   * @description: 
   */
  public opened_panel:
    'about_us' |
    'faq' |
    'terms' |
    'privacy' | 
    'menu' | 
    'profile' | 
    'settings' | 
    'logout' | 
    'update_password'  = 'menu';

  /**
   * @description:
   */
  public show_save_button: boolean = false;

  /**
   * @description:
   */
  public save_button_function: any = null;

  /**
   * @description: 
   */
  public componentForm: any = null;

  /**
   * @description: 
   */
  constructor(
    public userService: UserService,
  ) { }

  /**
   * @description
   */
  public ngOnInit(): void {
    this.bindStreamUser();
  }

  /**
   * @description: 
   */
  private bindStreamUser(): void {
    
    this.userService.stream.subscribe((user: any) => {
    });
  }

  /**
   * @description: 
   */
  public clickToBackground(): void {
    this.close.emit();
  }

  /**
   * @description:
   */
  public clickToWhitePanel($event: any): void {
    $event.stopPropagation();
  }

  /**
   * @description:
   */
  public goBack(): void {
    this.show_save_button = false;
    this.opened_panel = 'menu';
  }

  /**
   * @description: 
   */

  /**
   * @description:  
   */
  public changeState(state: any): void {
    this.show_save_button = false;
    this.opened_panel = state;
  }

  /**
   * @description:
   */
  public update_avatar(): void {
    alert ('aeuaoeus');
  }

  /**
   * @description:
   */
  public changeField($event: any): void {
    this.show_save_button = true;
    this.componentForm = $event.componentForm;
  }

  /**
   * @description: 
   */
  public saveTheForm(): void {
    if (this.componentForm === null) { return; }
    if (this.componentForm.ngSubmit === undefined) {
      alert ('This component does not have a ngSubmit function'); 
      return; 
    }

    this.componentForm.ngSubmit();
  }
}
