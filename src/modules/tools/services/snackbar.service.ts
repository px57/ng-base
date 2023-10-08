import { Injectable, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
// import { MatSnackBar, TextOnlySnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public data: any = {};

  /*
  * @description: DOC/ L'éléments ce ferme après avoir été actif un certain nombre de secondes
  */
  public snackbar_close_after_time: number = 3; // seconds
  // snackbar_close_after_time: number = 3; // seconds

  /*
  * @description:
  */
  constructor(
    // private _snackBar: MatSnackBar
  ) {
    // -> Chargée cette éléments de telle manieres à ce que sont affichages soit adapter.
    // https://material.angular.io/components/snack-bar/overview
  }

  public formResponseTraitement(response: any): void {
    if (response.success) { return; }
    if (!response.hasOwnProperty('form_error')) { return; }

    this.error(response.form_error[Object.keys(response.form_error)[0]]);
  }

  /*
  * @description: S'il y a une variables snackbar au sein de la requêtes de retour alors c'est qu'il faut activer le snackbar
  */
  public httpResponseTraitment(response: any): void {
    this.formResponseTraitement(response);
    if (!response.hasOwnProperty('snackbar')) {
      return;
    }
    let snackbar:any = response.snackbar;
    (this as any)[snackbar.type](snackbar.messages);
  }

  /*
  * @description: Permet de voir si l'éléments est ok.
  */
  private isNotDebugPriority(priority: any): boolean {
    return false;
  }

  /*
  * @description:
  */
  public default(messages: any, priority = 3): void {
    if (this.isNotDebugPriority(priority)) { return; }
    // this._snackBar.open(messages, '', {
    //   duration: this.snackbar_close_after_time * 1000,
    //   panelClass: ['snackbar_default']
    // });
  }

  /*
  * @description:
  */
  public warning(messages: any, priority = 3): void {
    if (this.isNotDebugPriority(priority)) { return; }
    // this._snackBar.open(messages, '', {
    //   duration: this.snackbar_close_after_time * 1000,
    //   panelClass: ['snackbar_warning']
    // });
  }

  /*
  * @description:
  */
  public success(messages: any, priority = 3): void {
    if (this.isNotDebugPriority(priority)) { return; }
    // TODO -> Ce serait pas mal de voir comment réaliser cette éléments pour que tout soit bien fonctionnelle.
    // this._snackBar.open(messages, '', {
    //   duration: this.snackbar_close_after_time * 1000,
    //   panelClass: ['snackbar_success']
    // });
  }

  /*
  * @description:
  */
  public error(messages: any, priority = 3): void {
    // this._snackBar.open(messages, '', {
    //   duration: this.snackbar_close_after_time * 1000,
    //   panelClass: ['snackbar_error']
    // });
  }

}
