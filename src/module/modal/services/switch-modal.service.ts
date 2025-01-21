import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfig } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SwitchModalService {

  /**
   * @description:   
   */
  private config_list: Array<ModalConfig> = [];

  constructor(
    public router: Router,
  ) {

  }

  /*
  * @description: Recuperer le nom dans l'url.
  */
  public get_switch_name() {
    const url = new URL(window.location.href);
    return url.searchParams.get(`switch`);
  }

  /*
  * @description: Get the good params.
  */


  /*
  * @description:
  */
  public open_modal(name: string | undefined, params: any = {}) {
    if (name !== undefined) {
      params.switch = name;
    }

    this.router.navigate(
      [],
      {
        queryParams: params
      }
    );
  }

  /*
  * @description:
  */
  public close(params: any = {}) {
    this.open_modal(undefined, params);
  }

  /*
  * @description:
  */
  public open_help(hash: string): void {
      this.open_modal(`info_curbapp_manifest_create`);
  }

  /**
   * @description:
   */
  public clickWhiteContainer($event: any): void {
    $event.stopPropagation();
  }

  /**
   * @description:
   */
  public has_in_switchmodal(): boolean {
    return this.get_switch_name() !== null;
  }


  /**
   * @description:
   */
  public set_config(config: ModalConfig): void {
    if (this.config_exists(config.name)) {
      return; 
    }
    this.config_list.push(config);
    console.log(this.config_list)
  }

  /**
   * @description: 
   */
  public set_config_list(config_list: Array<ModalConfig>): void {
    for (const config of config_list) {
      this.set_config(config);
    }
    
  }

  /**
   * @description: 
   */
  public get_config(config_name: string): ModalConfig | undefined {
    for (const config of this.config_list) {
      if (config.name === config_name) {
        return config;
      }
    }
    return undefined;
  } 

  /**
   * @description:
   */
  public config_exists(config_name: string): boolean {
    return this.get_config(config_name) !== undefined;
  }
}
