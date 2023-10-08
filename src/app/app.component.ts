import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { PlayroomService, CapsuleTime } from 'src/app/services/playroom.service';
import { SigninComponent } from 'src/modules/profile/components/signin/signin.component';
import { SignupComponent } from 'src/modules/profile/components/signup/signup.component';
import { ForgetPasswordComponent } from 'src/modules/profile/components/forget-password/forget-password.component';
import { ModalConfig } from 'src/modules/modal/types';
import { SwitchModalService } from 'src/modules/modal/services/switch-modal.service';
import { UserService } from 'src/modules/profile/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * @description:
   */
  public title = 'gtender';

  /**
   * @description: 
   */
  public caps: CapsuleTime = new CapsuleTime();

  constructor(
    private ws: WebsocketService,
    private playroomService: PlayroomService,
    private switchModalService: SwitchModalService,
  ) {}

  /**
   * @description: 
   */
  public ngOnInit() {
    this.bindPlayroomStream();
    this.setListConfig();
  }

  /**
   * @description: 
   */
  public setListConfig() {
    this.switchModalService.set_config_list([
      {
        name: 'signup',
        component: SignupComponent,
        backgroundClassName: 'modal-background',
        containerClassName: 'modal-container',
      },
      {
        name: 'login',
        component: SigninComponent,
        backgroundClassName: 'modal-background',
        containerClassName: 'modal-container',
      },
      {
        name: 'forget_password',
        component: ForgetPasswordComponent,
        backgroundClassName: 'modal-background',
        containerClassName: 'modal-container',
      }
    ]);
  }


  /**
   * @description: 
   */
  public displayTicketListContainer(): boolean {
    // TODO: check if user has tickets
    return this.caps.generate_tickets();
  }

  // --------------------------------------------------------------------------- [STREAM]

  /**
   * @description:
   */
  private bindPlayroomStream(): void {
    this.playroomService.stream.subscribe((data: any) => {
      let event_key = 'recept__' + data.event;
      if ((this as any)[event_key] === undefined) {
        alert(event_key + ' is not defined in app.component.ts');
      }
      (this as any)[event_key](data.data);
    });
  }

  /**
   * @description: 
   */
  public recept__lottery_ticket_values(data: any): void { }

  /**
   * @description: 
   */
  public recept__account_balance(data: any): void { }

  /**
   * @description: 
   */
  public recept__party_time(data: any): void {
    this.caps = data.caps;
  }

  /**
   * @description:
   */
  public recept__ticket_list(data: any): void { }

  /**
   * @description: 
   */
  public recept__jackpot(data: any) { }
}
