import { Component, Injector } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { SwitchModalService } from '../../services/switch-modal.service';
import { ModalConfig } from '../../types';

@Component({
  selector: 'app-switch-modal',
  templateUrl: './switch-modal.component.html',
  styleUrls: ['./switch-modal.component.scss']
})
export class SwitchModalComponent {
  /**
   * @description:
   */
  public switch: string = ``;

  /**
   * @description:
   */
  public component: any;

  /**
   * @description: 
   */
  public myInjector: Injector | undefined = undefined;

  /**
   * @description:
   */
  public myContent: any = {
    SigninSuccess: (data: string) => {
      alert ('salut grosse salope.');
    }
  };

  /**
   * @description: 
   */
  public config: ModalConfig | undefined = undefined;

  /**
   * @description: 
   */
  public  myInputs = {'label': 'Complete'};

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private switchModalService: SwitchModalService,
  ) {
    this.myInjector = Injector.create({
      providers: [{ 
        provide: 'data', 
        useValue: 'Données passées au composant dynamique' 
      }],
      parent: this.injector
    });
    this.myContent = {
      SigninSuccess: (data: string) => {
        alert ('salut grosse salope.');
      }
    };   
  }

  /**
   * @description:
   */
  public ngOnInit() {
    this.bindQueryParams();
    console.log(this);
  }

  /**
   * @description:  
   */
  private bindQueryParams() {
    this.route.queryParams.subscribe((response: any) => {
      this.updateSwitch(response.switch);
    });
    const urlParams = new URLSearchParams(window.location.search);
    let switch_name = urlParams.get('switch');
    if (switch_name === null) {
      return;
    }
    this.updateSwitch(switch_name);
  }

  /**
   * @description: 
   */
  private updateSwitch(switch_name: string | undefined ): void {
    if (switch_name === undefined) {
      this.switch = "";
      this.config = undefined;
      return;
    }
    this.switch = switch_name;
    this.config = this.switchModalService.get_config(switch_name);
    this.myInjector = Injector.create({
      providers: [{ 
        provide: 'data', 
        useValue: 'Données passées au composant dynamique' 
      }],
      parent: this.injector
    });
    this.myContent = {
      SigninSuccess: (data: string) => {
        alert ('salut grosse salope.');
      }
    };
    console.log(this.myContent);
  }

  /*
   * @description:
   */
  public openedLink(switchKey: string): boolean {
    return this.switch === switchKey;
  }

  /**
   * @description:
   */
  public close(): void {
    this.switch = "";
  }

  /**
   * @description:
   */
  public clickToViewContainer($event: any): void {
    $event.stopPropagation();
  }

  /**
   * @description:
   */
  public clickToBackgroundContainer(): void {
    if (
      this.component !== undefined &&
      this.component.switchModal__eventClose !== undefined
    ) {
      if (!this.component.switchModal__eventClose()) {
        return;
      }
    }
    setTimeout(() => {
      this.switchModalService.close();
    }, 200);
  }

  /**
   * @description:
   */
  public init($event: any): void {
    this.component = $event;
  }

  /**
   * @description: 
   */
  public SigninSuccess(): void {
    alert ('aoeuaoeu');
  }
}
